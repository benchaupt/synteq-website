"use client";

import { AnimatedButton } from "@/app/_components/animated-button";
import { SliderTabs } from "@/app/_components/slider-tabs";
import { TestimonialCarousel } from "@/app/_components/testimonial-carousel";
import { cn } from "@/lib/utils";
import * as Select from "@radix-ui/react-select";
import { useState, useCallback, useEffect } from "react";

// Icon component using CSS mask so color can transition on focus
const FormIcon = ({ src, size = "h-4", isShimmering = false }: { src: string; size?: string; isShimmering?: boolean }) => (
    <span
        className={cn(
            `${size} aspect-square shrink-0 transition-colors duration-300`,
            isShimmering ? "shimmer-accent" : "bg-white/80 group-focus-within/field:bg-accent"
        )}
        style={{
            maskImage: `url(${src})`,
            maskSize: "contain",
            maskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskImage: `url(${src})`,
            WebkitMaskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
        }}
    />
);

const ChevronDownIcon = () => (
    <svg className="size-4 text-white/80" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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

const budgetOptions = [
    { value: "<10k", label: "<$10k", desc: "Early-stage or prototype" },
    { value: "10k-50k", label: "$10k - $50k", desc: "Growing teams and workloads" },
    { value: "50k-100k", label: "$50k - $100k", desc: "Production-grade infrastructure" },
    { value: "100k+", label: "$100k+", desc: "Enterprise-scale deployments" },
];

const teamSizeOptions = [
    { value: "1-10", label: "1–10", desc: "Startup or small team" },
    { value: "11-50", label: "11–50", desc: "Growing engineering org" },
    { value: "51-200", label: "51–200", desc: "Mid-size company" },
    { value: "200+", label: "200+", desc: "Enterprise organization" },
];

const productOptions = ["GPU Cloud", "GPU Metal", "Unsure"];

// Shared inline style for shimmer text overlay (bg-clip:text via CSS class gets reset by background shorthand)
const shimmerTextStyle: React.CSSProperties = {
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
};

export default function Contact() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [budget, setBudget] = useState("");
    const [teamSize, setTeamSize] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [budgetOpen, setBudgetOpen] = useState(false);
    const [teamSizeOpen, setTeamSizeOpen] = useState(false);

    // Close dropdowns on scroll outside them
    useEffect(() => {
        if (!budgetOpen && !teamSizeOpen) return;
        const handleWheel = (e: WheelEvent) => {
            if (!(e.target as HTMLElement).closest('[data-radix-popper-content-wrapper]')) {
                setBudgetOpen(false);
                setTeamSizeOpen(false);
            }
        };
        const handleTouch = () => { setBudgetOpen(false); setTeamSizeOpen(false); };
        window.addEventListener('wheel', handleWheel, { passive: true });
        window.addEventListener('touchmove', handleTouch, { passive: true });
        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchmove', handleTouch);
        };
    }, [budgetOpen, teamSizeOpen]);

    const clearSuccess = useCallback(() => {
        setIsSuccess(false);
    }, []);

    const handleSubmit = () => {
        if (isLoading) return;
        setIsLoading(true);
        setIsSuccess(false);
        // Simulate loading — replace with real submit logic
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
            setFirstName("");
            setLastName("");
            setCompany("");
            setEmail("");
            setSelectedProduct(null);
            setBudget("");
            setTeamSize("");
            setMessage("");
        }, 2000);
    };

    const budgetLabel = budget ? budgetOptions.find(o => o.value === budget)?.label : null;
    const teamSizeLabel = teamSize ? teamSizeOptions.find(o => o.value === teamSize)?.label : null;

    const isFormValid = firstName.trim() !== "" && lastName.trim() !== "" && email.trim() !== "" && selectedProduct !== null && message.trim() !== "";

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
                            Let&apos;s build the future together.
                            </h1>
                        </div>

                        <p className="text-base text-[#bfbfbf] max-w-lg leading-relaxed">
                        The most ambitious teams don&apos;t wait for infrastructure to catch up. Tell us where you&apos;re going, and let us make sure you have the foundation to get there.
                        </p>

                        <div className="flex flex-col gap-2 mt-8 w-fit">
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
                    <div className="pt-8">
                        <div className="flex flex-col gap-8">
                            {/* Name Fields */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="group/field relative">
                                    <div className="flex items-center gap-3 px-2 py-3">
                                        <FormIcon src="/assets/icons/person.svg" isShimmering={isLoading} />
                                        <div className="relative flex-1 min-w-0">
                                            <input
                                                type="text"
                                                value={firstName}
                                                onChange={(e) => { setFirstName(e.target.value); clearSuccess(); }}
                                                placeholder="First Name *"
                                                disabled={isLoading}
                                                className={cn(
                                                    "bg-transparent w-full outline-none transition-colors duration-300",
                                                    isLoading ? "text-transparent placeholder:text-transparent" : "text-white placeholder:text-white/40"
                                                )}
                                            />
                                            {isLoading && (
                                                <span className="absolute inset-0 flex items-center pointer-events-none shimmer-accent truncate" style={shimmerTextStyle} aria-hidden="true">
                                                    {firstName || "First Name *"}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <span className={cn("absolute bottom-0 left-0 w-full h-px transition-all duration-300", isLoading ? "shimmer-accent" : "bg-white/50")} />
                                    <span className={cn("absolute bottom-0 left-0 w-full h-px bg-accent origin-left transition-transform duration-300", isLoading ? "scale-x-0" : "scale-x-0 group-focus-within/field:scale-x-100")} />
                                </div>
                                <div className="group/field relative">
                                    <div className="flex items-center gap-3 px-2 py-3">
                                        <FormIcon src="/assets/icons/person.svg" isShimmering={isLoading} />
                                        <div className="relative flex-1 min-w-0">
                                            <input
                                                type="text"
                                                value={lastName}
                                                onChange={(e) => { setLastName(e.target.value); clearSuccess(); }}
                                                placeholder="Last Name *"
                                                disabled={isLoading}
                                                className={cn(
                                                    "bg-transparent w-full outline-none transition-colors duration-300",
                                                    isLoading ? "text-transparent placeholder:text-transparent" : "text-white placeholder:text-white/40"
                                                )}
                                            />
                                            {isLoading && (
                                                <span className="absolute inset-0 flex items-center pointer-events-none shimmer-accent truncate" style={shimmerTextStyle} aria-hidden="true">
                                                    {lastName || "Last Name *"}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <span className={cn("absolute bottom-0 left-0 w-full h-px transition-all duration-300", isLoading ? "shimmer-accent" : "bg-white/50")} />
                                    <span className={cn("absolute bottom-0 left-0 w-full h-px bg-accent origin-left transition-transform duration-300", isLoading ? "scale-x-0" : "scale-x-0 group-focus-within/field:scale-x-100")} />
                                </div>
                            </div>

                            {/* Company & Email Fields */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="group/field relative">
                                    <div className="flex items-center gap-3 px-2 py-3">
                                        <FormIcon src="/assets/icons/company.svg" size="h-3.5" isShimmering={isLoading} />
                                        <div className="relative flex-1 min-w-0">
                                            <input
                                                type="text"
                                                value={company}
                                                onChange={(e) => { setCompany(e.target.value); clearSuccess(); }}
                                                placeholder="Company"
                                                disabled={isLoading}
                                                className={cn(
                                                    "bg-transparent w-full outline-none transition-colors duration-300",
                                                    isLoading ? "text-transparent placeholder:text-transparent" : "text-white placeholder:text-white/40"
                                                )}
                                            />
                                            {isLoading && (
                                                <span className="absolute inset-0 flex items-center pointer-events-none shimmer-accent truncate" style={shimmerTextStyle} aria-hidden="true">
                                                    {company || "Company"}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <span className={cn("absolute bottom-0 left-0 w-full h-px transition-all duration-300", isLoading ? "shimmer-accent" : "bg-white/50")} />
                                    <span className={cn("absolute bottom-0 left-0 w-full h-px bg-accent origin-left transition-transform duration-300", isLoading ? "scale-x-0" : "scale-x-0 group-focus-within/field:scale-x-100")} />
                                </div>
                                <div className="group/field relative">
                                    <div className="flex items-center gap-3 px-2 py-3">
                                        <FormIcon src="/assets/icons/email.svg" size="h-3" isShimmering={isLoading} />
                                        <div className="relative flex-1 min-w-0">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => { setEmail(e.target.value); clearSuccess(); }}
                                                placeholder="Email Address *"
                                                disabled={isLoading}
                                                className={cn(
                                                    "bg-transparent w-full outline-none transition-colors duration-300",
                                                    isLoading ? "text-transparent placeholder:text-transparent" : "text-white placeholder:text-white/40"
                                                )}
                                            />
                                            {isLoading && (
                                                <span className="absolute inset-0 flex items-center pointer-events-none shimmer-accent truncate" style={shimmerTextStyle} aria-hidden="true">
                                                    {email || "Email Address *"}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <span className={cn("absolute bottom-0 left-0 w-full h-px transition-all duration-300", isLoading ? "shimmer-accent" : "bg-white/50")} />
                                    <span className={cn("absolute bottom-0 left-0 w-full h-px bg-accent origin-left transition-transform duration-300", isLoading ? "scale-x-0" : "scale-x-0 group-focus-within/field:scale-x-100")} />
                                </div>
                            </div>

                            {/* Product Stack Selection */}
                            <div className="flex flex-col gap-3">
                                <p className="text-white/40 text-sm">What product stack are you interested in?*</p>
                                <SliderTabs
                                    items={productOptions}
                                    activeItem={selectedProduct}
                                    onItemChange={(v) => { setSelectedProduct(v); clearSuccess(); }}
                                    isShimmering={isLoading}
                                />
                            </div>

                            {/* Dropdowns */}
                            <div className="grid grid-cols-2 gap-6">
                                {/* Project Budget Select */}
                                <div className="group/field relative">
                                    <Select.Root open={budgetOpen} onOpenChange={setBudgetOpen} value={budget || undefined} onValueChange={(v) => { setBudget(v); clearSuccess(); }} disabled={isLoading}>
                                        <Select.Trigger className="flex items-center justify-between gap-3 w-full px-2 py-3 outline-none data-placeholder:text-white/40 text-white cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <FormIcon src="/assets/icons/budget.svg" isShimmering={isLoading} />
                                                <div className="relative">
                                                    <span className={cn(isLoading && "invisible")}>
                                                        <Select.Value placeholder="Estimated Budget" />
                                                    </span>
                                                    {isLoading && (
                                                        <span className="absolute inset-0 flex items-center pointer-events-none shimmer-accent truncate whitespace-nowrap" style={shimmerTextStyle} aria-hidden="true">
                                                            {budgetLabel || "Estimated Budget"}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <Select.Icon className={cn("transition-transform duration-200 group-data-[state=open]:rotate-180", isLoading && "invisible")}>
                                                <ChevronDownIcon />
                                            </Select.Icon>
                                        </Select.Trigger>
                                        <Select.Portal>
                                            <Select.Content
                                                className="bg-background-secondary overflow-hidden z-50 border border-white/10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:slide-in-from-top-1 data-[state=closed]:slide-out-to-top-1 duration-150"
                                                position="popper"
                                                sideOffset={8}
                                            >
                                                <Select.Viewport>
                                                    {budgetOptions.map((option, i) => (
                                                        <Select.Item
                                                            key={option.value}
                                                            value={option.value}
                                                            className={cn(
                                                                "px-4 py-3 outline-none cursor-pointer hover:bg-white/5 data-highlighted:bg-white/5 transition-colors",
                                                                i > 0 && "border-t border-white/5"
                                                            )}
                                                        >
                                                            <Select.ItemText>
                                                                <span className="text-white text-sm font-medium">{option.label}</span>
                                                            </Select.ItemText>
                                                            {/* <p className="text-white/40 text-xs mt-0.5">{option.desc}</p> */}
                                                        </Select.Item>
                                                    ))}
                                                </Select.Viewport>
                                            </Select.Content>
                                        </Select.Portal>
                                    </Select.Root>
                                    <span className={cn("absolute bottom-0 left-0 w-full h-px transition-all duration-300", isLoading ? "shimmer-accent" : "bg-white/50")} />
                                    <span className={cn("absolute bottom-0 left-0 w-full h-px bg-accent origin-left transition-transform duration-300", isLoading ? "scale-x-0" : "scale-x-0 group-focus-within/field:scale-x-100")} />
                                </div>

                                {/* Team Size Select */}
                                <div className="group/field relative">
                                    <Select.Root open={teamSizeOpen} onOpenChange={setTeamSizeOpen} value={teamSize || undefined} onValueChange={(v) => { setTeamSize(v); clearSuccess(); }} disabled={isLoading}>
                                        <Select.Trigger className="flex items-center justify-between gap-3 w-full px-2 py-3 outline-none data-placeholder:text-white/40 text-white cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <FormIcon src="/assets/icons/team.svg" size="h-3.5" isShimmering={isLoading} />
                                                <div className="relative">
                                                    <span className={cn(isLoading && "invisible")}>
                                                        <Select.Value placeholder="Team Size" />
                                                    </span>
                                                    {isLoading && (
                                                        <span className="absolute inset-0 flex items-center pointer-events-none shimmer-accent truncate whitespace-nowrap" style={shimmerTextStyle} aria-hidden="true">
                                                            {teamSizeLabel || "Team Size"}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <Select.Icon className={cn("transition-transform duration-200 group-data-[state=open]:rotate-180", isLoading && "invisible")}>
                                                <ChevronDownIcon />
                                            </Select.Icon>
                                        </Select.Trigger>
                                        <Select.Portal>
                                            <Select.Content
                                                className="bg-background-secondary overflow-hidden z-50 border border-white/10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:slide-in-from-top-1 data-[state=closed]:slide-out-to-top-1 duration-150"
                                                position="popper"
                                                sideOffset={8}
                                            >
                                                <Select.Viewport>
                                                    {teamSizeOptions.map((option, i) => (
                                                        <Select.Item
                                                            key={option.value}
                                                            value={option.value}
                                                            className={cn(
                                                                "px-4 py-3 outline-none cursor-pointer hover:bg-white/5 data-highlighted:bg-white/5 transition-colors",
                                                                i > 0 && "border-t border-white/5"
                                                            )}
                                                        >
                                                            <Select.ItemText>
                                                                <span className="text-white text-sm font-medium">{option.label}</span>
                                                            </Select.ItemText>
                                                            {/* <p className="text-white/40 text-xs mt-0.5">{option.desc}</p> */}
                                                        </Select.Item>
                                                    ))}
                                                </Select.Viewport>
                                            </Select.Content>
                                        </Select.Portal>
                                    </Select.Root>
                                    <span className={cn("absolute bottom-0 left-0 w-full h-px transition-all duration-300", isLoading ? "shimmer-accent" : "bg-white/50")} />
                                    <span className={cn("absolute bottom-0 left-0 w-full h-px bg-accent origin-left transition-transform duration-300", isLoading ? "scale-x-0" : "scale-x-0 group-focus-within/field:scale-x-100")} />
                                </div>
                            </div>

                            {/* Textarea */}
                            <div className="group/field relative">
                                <div className="relative">
                                    <textarea
                                        value={message}
                                        onChange={(e) => { setMessage(e.target.value); clearSuccess(); }}
                                        placeholder="Tell us what you're working on *"
                                        rows={4}
                                        disabled={isLoading}
                                        className={cn(
                                            "bg-transparent w-full px-2 py-3 outline-none resize-none transition-colors duration-300",
                                            isLoading ? "text-transparent placeholder:text-transparent" : "text-white placeholder:text-white/40"
                                        )}
                                    />
                                    {isLoading && (
                                        <span
                                            className="absolute inset-0 px-2 py-3 pointer-events-none shimmer-accent whitespace-pre-wrap break-words"
                                            style={shimmerTextStyle}
                                            aria-hidden="true"
                                        >
                                            {message || "Tell us what you're working on *"}
                                        </span>
                                    )}
                                </div>
                                <span className={cn("absolute bottom-0 left-0 w-full h-px transition-all duration-300", isLoading ? "shimmer-accent" : "bg-white/50")} />
                                <span className={cn("absolute bottom-0 left-0 w-full h-px bg-accent origin-left transition-transform duration-300", isLoading ? "scale-x-0" : "scale-x-0 group-focus-within/field:scale-x-100")} />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-start pt-2">
                                <AnimatedButton
                                    background={isSuccess ? "primary" : "dark"}
                                    size="wide"
                                    onClick={handleSubmit}
                                    disabled={isLoading || (!isFormValid && !isSuccess)}
                                    data-active={isLoading || isSuccess ? "" : undefined}
                                    className={cn("min-w-32 min-h-12 flex items-center justify-center", !isFormValid && !isLoading && !isSuccess && "opacity-50 pointer-events-none")}
                                >
                                    {isLoading ? (
                                        <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                                            <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" />
                                        </svg>
                                    ) : isSuccess ? (
                                        <span className="flex items-center gap-2 text-accent">
                                            Sent
                                            <svg className="size-4 text-accent" viewBox="0 0 16 16" fill="none">
                                                <path d="M2 8L6 12L14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    ) : (
                                        "Submit"
                                    )}
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
