import { CodeIcon, ImageIcon, LayoutDashboard, MessageSquare, MusicIcon, SettingsIcon, VideoIcon } from 'lucide-react'

export const tools = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: '/dashboard',
        color: 'text-blue-400'
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: '/conversation',
        color: 'text-violet-500',
        backgroundColor: 'bg-violet-500/50',
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: '/image_generation',
        color: 'text-pink-700',
        backgroundColor: 'bg-pink-700/50',
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: '/video_generation',
        color: 'text-green-500',
        backgroundColor: 'bg-green-500/50',
    },
    {
        label: "Music Generation",
        icon: MusicIcon,
        href: '/music_generation',
        color: 'text-yellow-500',
        backgroundColor: 'bg-yellow-500/50',
    },
    {
        label: "Code Generation",
        icon: CodeIcon,
        href: '/code_generation',
        color: 'text-red-700',
        backgroundColor: 'bg-red-700/50',
    },
    {
        label: "Setting",
        icon: SettingsIcon,
        href: '/settings',
        color: 'text-gray-300',
        backgroundColor: 'bg-gray-300/50',
    },]