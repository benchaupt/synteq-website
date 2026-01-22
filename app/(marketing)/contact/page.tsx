"use client";
 

import { AnimatedButton } from "@/app/_components/animated-button";
import { SliderTabs } from "@/app/_components/slider-tabs";
import { TestimonialCarousel } from "@/app/_components/testimonial-carousel";
import * as Select from "@radix-ui/react-select";
import { useState } from "react";

// Icons for form inputs
const PersonIcon = () => (
    <svg className="size-5 text-white/50" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 10C12.0711 10 13.75 8.32107 13.75 6.25C13.75 4.17893 12.0711 2.5 10 2.5C7.92893 2.5 6.25 4.17893 6.25 6.25C6.25 8.32107 7.92893 10 10 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.75 17.5C3.75 14.0482 6.54822 11.25 10 11.25C13.4518 11.25 16.25 14.0482 16.25 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const BuildingIcon = () => (
    <svg className="size-5 text-white/50" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 17.5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.75 17.5V5C3.75 4.30964 4.30964 3.75 5 3.75H10C10.6904 3.75 11.25 4.30964 11.25 5V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.25 17.5V8.75C11.25 8.05964 11.8096 7.5 12.5 7.5H15C15.6904 7.5 16.25 8.05964 16.25 8.75V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.25 7.5H8.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.5 11.25V13.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const MailIcon = () => (
    <svg className="size-5 text-white/50" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 6.25L10 11.25L17.5 6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.75 5H16.25C17.0784 5 17.75 5.67157 17.5 6.25V15C17.5 15.6904 16.9404 16.25 16.25 16.25H3.75C3.05964 16.25 2.5 15.6904 2.5 15V6.25C2.5 5.55964 3.05964 5 3.75 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const DollarIcon = () => (
    <svg className="size-5 text-white/50" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2.5V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.75 5H8.125C7.42881 5 6.76113 5.27656 6.26884 5.76884C5.77656 6.26113 5.5 6.92881 5.5 7.625C5.5 8.32119 5.77656 8.98887 6.26884 9.48116C6.76113 9.97344 7.42881 10.25 8.125 10.25H11.875C12.5712 10.25 13.2389 10.5266 13.7312 11.0188C14.2234 11.5111 14.5 12.1788 14.5 12.875C14.5 13.5712 14.2234 14.2389 13.7312 14.7312C13.2389 15.2234 12.5712 15.5 11.875 15.5H5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const UsersIcon = () => (
    <svg className="size-5 text-white/50" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 9.16667C9.34095 9.16667 10.8333 7.67428 10.8333 5.83333C10.8333 3.99238 9.34095 2.5 7.5 2.5C5.65905 2.5 4.16667 3.99238 4.16667 5.83333C4.16667 7.67428 5.65905 9.16667 7.5 9.16667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2.5 17.5V15.8333C2.5 14.9493 2.85119 14.1014 3.47631 13.4763C4.10143 12.8512 4.94928 12.5 5.83333 12.5H9.16667C10.0507 12.5 10.8986 12.8512 11.5237 13.4763C12.1488 14.1014 12.5 14.9493 12.5 15.8333V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.3333 2.60833C14.0503 2.79192 14.6859 3.20892 15.1397 3.79359C15.5935 4.37827 15.8399 5.09736 15.8399 5.8375C15.8399 6.57764 15.5935 7.29673 15.1397 7.88141C14.6859 8.46608 14.0503 8.88308 13.3333 9.06667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17.5 17.5V15.8333C17.4958 15.0976 17.2479 14.3839 16.7953 13.8036C16.3426 13.2233 15.7108 12.8089 15 12.625" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg className="size-4 text-white/50" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// LinkedIn Icon
const LinkedInIcon = () => (
    <svg className="size-6" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.83398 16.458H0.291992V5.75H3.83398V16.458Z" fill="currentColor"/>
        <path d="M11.7715 5.47852C15.3544 5.47864 16.0839 7.84334 16.084 10.916V16.458H12.542V11.25C12.542 9.91667 12.5212 8.2287 10.709 8.22852C8.87558 8.22852 8.58398 9.65591 8.58398 11.1455V16.458H5.04199V5.75H8.4375V7.29102H8.47949C8.94827 6.41608 10.0841 5.47852 11.7715 5.47852Z" fill="currentColor"/>
        <path d="M2.0625 0C3.20317 0 4.125 0.92187 4.125 2.0625C4.12483 3.20297 3.20306 4.125 2.0625 4.125C0.922136 4.12483 0.000173621 3.20286 0 2.0625C0 0.921977 0.922029 0.000173689 2.0625 0Z" fill="currentColor"/>
    </svg>
);

// X (Twitter) Icon
const XIcon = () => (
    <svg className="size-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.9014 14.3251L28.3464 3.875H26.0914L17.9264 12.9501L11.4264 3.875H3.875L13.7964 17.5551L3.875 28.5625H6.13L14.7714 18.9301L21.6364 28.5625H29.1875L18.9014 14.3251ZM15.8764 17.6801L14.8914 16.3151L6.91641 5.46H10.3714L16.7514 14.2501L17.7364 15.6151L26.0914 27.0375H22.6364L15.8764 17.6801Z" fill="currentColor" />
    </svg>
);

// Discord Icon
const DiscordIcon = () => (
    <svg className="size-6" viewBox="0 0 259 187" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M94.2275 0.00195312L96.4453 2.66895C56.5374 14.2176 38.1348 31.7695 38.1348 31.7695C38.1606 31.7554 43.0333 29.0937 51.2139 25.3271C74.9378 14.8856 93.7848 11.9987 101.545 11.332C102.874 11.1088 103.984 10.8877 105.314 10.8877C120.172 8.94842 135.209 8.79962 150.102 10.4443C171.163 12.8877 193.779 19.1078 216.836 31.7695C216.836 31.7695 199.321 15.1093 161.629 3.55762L164.733 0.00390625C164.856 0.00130452 195.172 -0.615507 227.034 23.3291C227.097 23.443 258.963 81.3779 258.963 152.838C258.928 152.898 240.07 185.05 191.117 186.604V186.604C191.089 186.571 183.124 177.036 176.483 168.609C205.469 160.406 216.569 142.249 216.614 142.175C207.524 148.173 198.877 152.395 191.117 155.28C180.032 159.947 169.389 163.055 158.969 164.833C137.683 168.831 118.173 167.721 101.545 164.611C88.9062 162.166 78.0423 158.613 68.9531 155.06C63.8531 153.06 58.3107 150.616 52.7666 147.506C52.1028 147.061 51.4368 146.839 50.7715 146.395C50.3291 146.173 50.106 145.951 49.8848 145.729C45.9056 143.514 43.6893 141.962 43.6768 141.953C43.7042 141.999 54.3559 159.736 82.4766 168.165C75.8261 176.608 67.6221 186.604 67.6221 186.604C18.6733 185.05 0.0388291 152.905 0 152.838C3.56765e-05 81.3584 31.8814 23.4095 31.9268 23.3271C63.8145 -0.635227 94.1539 0.000374108 94.2275 0.00195312ZM88.0195 82.8623C75.3823 82.8624 65.4063 93.9695 65.4062 107.52C65.4063 121.071 75.6036 132.178 88.0195 132.178C100.658 132.178 110.635 121.071 110.635 107.52C110.858 93.9694 100.657 82.8623 88.0195 82.8623ZM168.946 82.8623C156.308 82.8624 146.33 93.9695 146.33 107.52C146.33 121.071 156.53 132.178 168.946 132.178C181.584 132.178 191.56 121.071 191.56 107.52C191.56 93.9694 181.584 82.8623 168.946 82.8623Z" fill="currentColor"/>
    </svg>
);

// DELV Logo for testimonials
const DelvLogo = () => (
    <svg className="h-9" viewBox="0 0 200 37" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_delv)">
            <path d="M151.155 29.299H113.764V3.21166C113.764 2.35987 113.426 1.54297 112.823 0.940672C112.221 0.338372 111.403 0 110.551 0C109.699 0 108.882 0.338372 108.279 0.940672C107.676 1.54297 107.338 2.35987 107.338 3.21166V32.3647C107.374 33.2441 107.74 34.0779 108.363 34.7C108.986 35.3222 109.82 35.6872 110.7 35.7223H151.155C151.577 35.7223 151.995 35.6393 152.385 35.4778C152.775 35.3164 153.129 35.0799 153.427 34.7817C153.726 34.4834 153.963 34.1294 154.123 33.7398C154.286 33.35 154.369 32.9324 154.369 32.5107C154.369 32.089 154.286 31.6714 154.123 31.2816C153.963 30.892 153.726 30.5379 153.427 30.2397C153.129 29.9415 152.775 29.7048 152.385 29.5435C151.995 29.3821 151.577 29.299 151.155 29.299Z" fill="white" />
            <path d="M197.145 1.57875C196.821 1.30579 196.446 1.09947 196.042 0.971648C195.64 0.843824 195.214 0.797018 194.793 0.833919C194.371 0.870819 193.96 0.990699 193.584 1.18667C193.209 1.38264 192.877 1.65083 192.605 1.97583L171.377 27.2487L150.152 1.96414C149.879 1.63871 149.546 1.37041 149.169 1.17472C148.792 0.97902 148.381 0.859812 147.958 0.82398C147.535 0.788147 147.109 0.836399 146.705 0.965945C146.301 1.09549 145.926 1.30376 145.603 1.57875C145.279 1.8499 145.01 2.18263 144.814 2.55778C144.617 2.93294 144.498 3.34314 144.462 3.76479C144.424 4.18643 144.471 4.61122 144.599 5.01472C144.727 5.41821 144.933 5.79245 145.207 6.11593L168.751 34.1624C169.085 34.5235 169.491 34.8116 169.941 35.0086C170.392 35.2056 170.879 35.3074 171.371 35.3074C171.864 35.3074 172.35 35.2056 172.801 35.0086C173.252 34.8116 173.658 34.5235 173.991 34.1624L197.536 6.11593C197.809 5.79281 198.016 5.41887 198.145 5.01558C198.272 4.61231 198.32 4.18764 198.284 3.76601C198.248 3.34438 198.128 2.93409 197.933 2.55872C197.737 2.18335 197.469 1.85031 197.145 1.57875Z" fill="white" />
            <path d="M47.0483 18.2531C46.8701 8.86634 39.0355 1.43575 29.6849 1.43575H3.19576C2.36296 1.42633 1.56008 1.74583 0.961667 2.32481C0.363249 2.90378 0.0176562 3.69544 5.37623e-06 4.52768V32.5099C-0.00155303 33.3643 0.335746 34.1845 0.93802 34.7909C1.5403 35.3972 2.35845 35.7403 3.21329 35.7449H29.9624C32.2393 35.7381 34.4921 35.2778 36.5891 34.3912C38.686 33.5045 40.5853 32.2091 42.1759 30.5808C43.7666 28.9524 45.0167 27.0236 45.8532 24.9069C46.6898 22.7904 47.0961 20.5284 47.0483 18.2531ZM29.9711 29.2632H6.44409V7.90867H29.7434C35.5302 7.90867 40.4289 12.4546 40.6012 18.2618C40.6458 19.6869 40.4041 21.1065 39.8904 22.4366C39.3767 23.7667 38.6015 24.9804 37.6105 26.0061C36.6195 27.0316 35.4329 27.8482 34.1208 28.4077C32.8086 28.9671 31.3977 29.258 29.9711 29.2632Z" fill="white" />
            <path d="M95.9039 15.4434H55.5042C53.7263 15.4434 52.2852 16.8839 52.2852 18.6609C52.2852 20.4379 53.7263 21.8784 55.5042 21.8784H95.9039C97.6818 21.8784 99.1231 20.4379 99.1231 18.6609C99.1231 16.8839 97.6818 15.4434 95.9039 15.4434Z" fill="white" />
            <path d="M95.9039 1.55078H55.5042C53.7263 1.55078 52.2852 2.9913 52.2852 4.76827C52.2852 6.54523 53.7263 7.98574 55.5042 7.98574H95.9039C97.6818 7.98574 99.1231 6.54523 99.1231 4.76827C99.1231 2.9913 97.6818 1.55078 95.9039 1.55078Z" fill="white" />
            <path d="M95.9039 29.3359H55.5042C53.7263 29.3359 52.2852 30.7765 52.2852 32.5535C52.2852 34.3304 53.7263 35.771 55.5042 35.771H95.9039C97.6818 35.771 99.1231 34.3304 99.1231 32.5535C99.1231 30.7765 97.6818 29.3359 95.9039 29.3359Z" fill="white" />
        </g>
        <defs>
            <clipPath id="clip0_delv">
                <rect width="199.461" height="36.1228" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

const productOptions = ["GPU Cloud", "GPU Metal", "Unsure"];

export default function Contact() {
    const [selectedProduct, setSelectedProduct] = useState(productOptions[0]);

    const testimonials = [
        {
            logo: <DelvLogo />,
            name: "Joe Stefanelli",
            title: "CTO",
            company: "Delv",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
            logo: <DelvLogo />,
            name: "Joe Stefanelli",
            title: "CTO",
            company: "Delv",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
            logo: <DelvLogo />,
            name: "Joe Stefanelli",
            title: "CTO",
            company: "Delv",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
            logo: <DelvLogo />,
            name: "Joe Stefanelli",
            title: "CTO",
            company: "Delv",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
    ];

    return (
        <>

            {/* Hero + Form Section */}
            <section className="max-w-viewport w-full mx-auto px-5 py-24 flex flex-col">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left - Hero Content */}
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                            <p className="subheading">
                                Contact Sales
                            </p>
                            <h1 className="title max-w-lg">
                                Ready to build? Chat with us.
                            </h1>
                        </div>

                        <p className="text-base text-[#bfbfbf] max-w-xl leading-relaxed">
                            Launch, run, and scale AI models in minutes, without the cloud confusion, GPU expertise, or unpredictable costs. As easy as a single click.
                        </p>

                        <div className="flex flex-col gap-2 mt-8">
                            <p className="font-mono text-sm md:text-sm lg:text-sm text-white/50">
                                Prefer to start the conversation over email?
                            </p>
                            <a href="mailto:hello@synteq.ai" className="text-2xl text-white hover:text-accent transition-colors">
                                hello@synteq.ai
                            </a>
                        </div>

                        <div className="flex gap-6 mt-8">
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors">
                                <LinkedInIcon />
                            </a>
                            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors">
                                <XIcon />
                            </a>
                            <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors">
                                <DiscordIcon />
                            </a>
                        </div>
                    </div>

                    {/* Right - Contact Form */}
                    <div className="bg-background-secondary rounded-lg p-8">
                        <div className="flex flex-col gap-6">
                            {/* Name Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 bg-background rounded-md px-4 py-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.8),inset_0_0_0_2px_rgba(255,255,255,0.05)]">
                                    <PersonIcon />
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        className="bg-transparent w-full text-white placeholder:text-white/50 outline-none"
                                    />
                                </div>
                                <div className="flex items-center gap-3 bg-background rounded-md px-4 py-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.8),inset_0_0_0_2px_rgba(255,255,255,0.05)]">
                                    <PersonIcon />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        className="bg-transparent w-full text-white placeholder:text-white/50 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Company & Email Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 bg-background rounded-md px-4 py-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.8),inset_0_0_0_2px_rgba(255,255,255,0.05)]">
                                    <BuildingIcon />
                                    <input
                                        type="text"
                                        placeholder="Company"
                                        className="bg-transparent w-full text-white placeholder:text-white/50 outline-none"
                                    />
                                </div>
                                <div className="flex items-center gap-3 bg-background rounded-md px-4 py-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.8),inset_0_0_0_2px_rgba(255,255,255,0.05)]">
                                    <MailIcon />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="bg-transparent w-full text-white placeholder:text-white/50 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Product Stack Selection */}
                            <div className="flex flex-col gap-3">
                                <p className="text-white text-sm">What product stack are you interested in?</p>
                                <SliderTabs
                                    items={productOptions}
                                    activeItem={selectedProduct}
                                    onItemChange={setSelectedProduct}
                                />
                            </div>

                            {/* Dropdowns */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Project Budget Select */}
                                <Select.Root>
                                    <Select.Trigger className="flex items-center justify-between gap-3 bg-background rounded-md px-4 py-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.8),inset_0_0_0_2px_rgba(255,255,255,0.05)] outline-none data-placeholder:text-white/50 text-white cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <DollarIcon />
                                            <Select.Value placeholder="Project Budget" />
                                        </div>
                                        <Select.Icon className="transition-transform duration-200 group-data-[state=open]:rotate-180">
                                            <ChevronDownIcon />
                                        </Select.Icon>
                                    </Select.Trigger>
                                    <Select.Portal>
                                        <Select.Content
                                            className="bg-background-secondary rounded-md overflow-hidden z-50 shadow-[0_0_0_1px_rgba(0,0,0,0.8),0_0_0_2px_rgba(255,255,255,0.05)]"
                                            position="popper"
                                            sideOffset={4}
                                        >
                                            <Select.Viewport className="p-1">
                                                {[
                                                    { value: "<10k", label: "<$10k" },
                                                    { value: "10k-50k", label: "$10k - $50k" },
                                                    { value: "50k-100k", label: "$50k - $100k" },
                                                    { value: "100k+", label: "$100k+" },
                                                ].map((option) => (
                                                    <Select.Item
                                                        key={option.value}
                                                        value={option.value}
                                                        className="px-4 py-2 text-white/70 rounded outline-none cursor-pointer hover:bg-white/10 hover:text-white data-highlighted:bg-white/10 data-highlighted:text-white transition-colors"
                                                    >
                                                        <Select.ItemText>{option.label}</Select.ItemText>
                                                    </Select.Item>
                                                ))}
                                            </Select.Viewport>
                                        </Select.Content>
                                    </Select.Portal>
                                </Select.Root>

                                {/* Team Size Select */}
                                <Select.Root>
                                    <Select.Trigger className="flex items-center justify-between gap-3 bg-background rounded-md px-4 py-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.8),inset_0_0_0_2px_rgba(255,255,255,0.05)] outline-none data-placeholder:text-white/50 text-white cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <UsersIcon />
                                            <Select.Value placeholder="Team Size" />
                                        </div>
                                        <Select.Icon className="transition-transform duration-200 group-data-[state=open]:rotate-180">
                                            <ChevronDownIcon />
                                        </Select.Icon>
                                    </Select.Trigger>
                                    <Select.Portal>
                                        <Select.Content
                                            className="bg-background-secondary rounded-md overflow-hidden z-50 shadow-[0_0_0_1px_rgba(0,0,0,0.8),0_0_0_2px_rgba(255,255,255,0.05)]"
                                            position="popper"
                                            sideOffset={4}
                                        >
                                            <Select.Viewport className="p-1">
                                                {[
                                                    { value: "1-10", label: "1-10" },
                                                    { value: "11-50", label: "11-50" },
                                                    { value: "51-200", label: "51-200" },
                                                    { value: "200+", label: "200+" },
                                                ].map((option) => (
                                                    <Select.Item
                                                        key={option.value}
                                                        value={option.value}
                                                        className="px-4 py-2 text-white/70 rounded outline-none cursor-pointer hover:bg-white/10 hover:text-white data-highlighted:bg-white/10 data-highlighted:text-white transition-colors"
                                                    >
                                                        <Select.ItemText>{option.label}</Select.ItemText>
                                                    </Select.Item>
                                                ))}
                                            </Select.Viewport>
                                        </Select.Content>
                                    </Select.Portal>
                                </Select.Root>
                            </div>

                            {/* Textarea */}
                            <div className="flex flex-col gap-2">
                                <textarea
                                    placeholder="Tell us what you're working on"
                                    rows={5}
                                    className="bg-background rounded-md px-4 py-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.8),inset_0_0_0_2px_rgba(255,255,255,0.05)] text-white placeholder:text-white/50 outline-none resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <AnimatedButton background="dark" size="wide">
                                    Submit
                                </AnimatedButton>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Carousel */}
            <TestimonialCarousel testimonials={testimonials} />

        </>
    );
}
