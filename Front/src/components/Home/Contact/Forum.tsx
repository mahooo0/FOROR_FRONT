import { BlackBtn } from '@/components/Buttons';
import instanceAxios from '@/helpers/Requests/axios';
import GETRequest from '@/helpers/Requests/Query';
import { Price_item, Translates } from '@/helpers/Requests/Types';
import { StoreState, useStore } from '@/helpers/StateManegment';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

type FormData = {
    fio: string;
    phoneNumber: string;
    message: string;
    selectedPriceVariant: number;
};

function ContactForum() {
    const language = useStore((state: any) => state.Lang);
    const navigate = useNavigate();
    const { data: Translation } = GETRequest<Translates>(
        'translations',
        'translations',
        [language]
    );
    const { data: Price_list } = GETRequest<Price_item[]>(
        'priceList',
        'priceList',
        [language]
    );
    const [formData, setFormData] = useState<FormData>({
        fio: '',
        phoneNumber: '',
        message: '',
        selectedPriceVariant: 0,
    });

    // Regex for validating Azerbaijan phone numbers
    // const phoneRegex = /^0(50|51|55|70|77|99)\d{7}$/;
    const setSelectedPriceVariant = useStore(
        (state: StoreState) => state.setSelectedPriceVariant
    );
    const SelectedPriceVariant = useStore(
        (state: StoreState) => state.SelectedPriceVariant
    );
    const handleChange = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (name === 'selectedPriceVariant') {
            setSelectedPriceVariant(value);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validate phone number
        // if (!phoneRegex.test(formData.phoneNumber)) {
        //     setPhoneError(
        //         'Please enter a valid Azerbaijan phone number (e.g., 0552660728)'
        //     );
        //     return;
        // }
        try {
            await instanceAxios
                .post('contact', {
                    message: formData.message,
                    phone: formData.phoneNumber,
                    fio: formData.fio,
                    price: formData.selectedPriceVariant,
                })
                .then(() => {
                    navigate('sucses');
                });
        } catch (error) {
            console.log(error);
        }

        // Handle valid form submission here
        console.log('Form submitted', formData);
    };

    return (
        <form
            className="lg:w-[46%] w-full grid grid-cols-2 gap-4"
            onSubmit={handleSubmit}
        >
            <div className="xl:col-span-1 col-span-2 h-fit flex flex-col gap-2">
                <label className="text-base">{Translation?.Fio}</label>
                <input
                    type="text"
                    name="fio"
                    value={formData.fio}
                    onChange={handleChange}
                    className="h-[48px] w-full border rounded-lg border-[#222222] bg-white text-base px-[12px]"
                />
            </div>

            <div className="xl:col-span-1 col-span-2 h-fit flex flex-col gap-2">
                <label className="text-base">{Translation?.Phone_number}</label>
                <input
                    type="number" // Changed to text for flexible handling
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="h-[48px] w-full border rounded-lg border-[#222222] bg-white text-base px-[12px]"
                />
                {/* {phoneError && (
                    <p className="text-red-500 text-sm">{phoneError}</p>
                )} */}
            </div>

            {SelectedPriceVariant !== '0' && (
                <div className="col-span-2 h-fit flex flex-col gap-2">
                    <label htmlFor="selectField" className="text-base">
                        {Translation?.SELECT_OPTION}
                    </label>
                    <div className="w-full">
                        <div className="relative h-[48px] w-full rounded-[8px] bg-gradient-to-r from-[#E6D535] to-[#E53535] p-[2px]">
                            <div className="h-full w-full bg-white rounded-[8px] border-r-[16px] border-white">
                                <select
                                    name="selectedPriceVariant"
                                    value={SelectedPriceVariant}
                                    onChange={handleChange}
                                    id="selectField"
                                    className="w-full h-full text-base px-[12px] rounded-[8px] border-0 focus:ring-0 focus:outline-none bg-transparent"
                                >
                                    <option value="">
                                        {Translation?.SELECT_OPTION}
                                    </option>
                                    {Price_list &&
                                        Price_list?.map((item) => (
                                            <option value={item.title}>
                                                {item.title}
                                            </option>
                                        ))}
                                    {/* <option value="3">Option Two</option>
                                <option value="4">Option Three</option> */}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="col-span-2 h-fit flex flex-col gap-2">
                <label className="text-base">{Translation?.Message}</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="h-[180px] w-full border rounded-lg border-[#222222] bg-white text-base py-2 px-[12px]"
                ></textarea>
            </div>

            {Translation && (
                <BlackBtn
                    text={Translation?.Submit}
                    className="col-span-2 h-[48px]"
                />
            )}
        </form>
    );
}

export default ContactForum;
