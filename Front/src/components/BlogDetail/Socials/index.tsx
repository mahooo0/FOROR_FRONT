import { Link, Linkedin, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

interface SocialShareProps {
    url?: string;
    title?: string;
}

export default function SocialShare({
    url = typeof window !== 'undefined' ? window.location.href : '',
    title = 'Check out this post',
}: SocialShareProps) {
    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            toast.success('Link copied to clipboard');
        } catch (err) {
            toast.error('Failed to copy link');
        }
    };

    const shareToLinkedIn = () => {
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                url
            )}`,
            '_blank'
        );
    };

    const shareToTwitter = () => {
        window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                url
            )}&text=${encodeURIComponent(title)}`,
            '_blank'
        );
    };

    const shareToFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                url
            )}`,
            '_blank'
        );
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-4">Share this post</h2>
            <div className="flex flex-wrap gap-4">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-full"
                    onClick={handleCopyLink}
                    aria-label="Copy link"
                >
                    <Link className="h-5 w-5" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-full"
                    onClick={shareToLinkedIn}
                    aria-label="Share to LinkedIn"
                >
                    <Linkedin className="h-5 w-5" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-full"
                    onClick={shareToTwitter}
                    aria-label="Share to Twitter"
                >
                    <Twitter className="h-5 w-5" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-full"
                    onClick={shareToFacebook}
                    aria-label="Share to Facebook"
                >
                    <Facebook className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
}
