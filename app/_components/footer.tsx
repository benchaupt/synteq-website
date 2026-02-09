import Link from "next/link"

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

export const Footer = () => {
    return (
        <footer className="border-t border-white/5">
            <div className="max-w-viewport w-full mx-auto px-5 py-24 flex flex-col gap-16">
                {/* Row 1: Logo | Subheading + Paragraph */}
                <div className="flex flex-col lg:flex-row lg:justify-between gap-16 items-start">
                    {/* Logo */}
                    <div className="flex items-center">
                        <svg viewBox="0 0 196 62" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto">
                            <g clipPath="url(#clip0_299_1571)">
                                <path d="M13.9443 44.2984C5.64263 44.2984 0.191607 39.5435 0 32.2468H6.84701C7.03862 35.9616 10.0809 37.9129 14.1985 37.9129C18.0032 37.9129 20.9164 36.2822 20.9164 33.3534C20.9164 29.967 17.2407 29.2475 13.0566 28.5319C7.35145 27.4879 0.633476 26.1857 0.633476 18.0444C0.633476 11.7253 5.89289 7.36133 13.8817 7.36133C21.8706 7.36133 27.0009 11.8582 27.13 18.6309H20.4746C20.3494 15.3071 17.8116 13.4849 13.694 13.4849C9.8267 13.4849 7.41792 15.2446 7.41792 17.7863C7.41792 20.9146 10.906 21.5011 15.0235 22.2167C20.7913 23.1943 27.826 24.3674 27.826 33.0327C27.826 39.8719 22.3124 44.3024 13.9443 44.3024V44.2984Z" fill="white" />
                                <path d="M54.9519 8.20312H62.4324L46.7128 44.0336C42.8455 52.8945 39.424 56.0188 32.4518 56.0188H28.9638V49.5042H31.9435C36.4443 49.5042 37.8364 48.1356 40.3742 42.532L41.1328 40.8389L26.2383 8.20312H33.8439L44.7459 32.764L54.9519 8.20312Z" fill="white" />
                                <path d="M82.3822 7.42578C90.4336 7.42578 95.4388 13.5494 95.4388 22.2147V43.3892H88.4041V23.7163C88.4041 17.3307 85.6786 13.9443 80.5443 13.9443C75.1559 13.9443 71.355 18.3747 71.355 24.5648V43.3931H64.3203V8.20785H69.2004L70.5964 13.1583C73.1303 9.57647 77.377 7.42578 82.3861 7.42578H82.3822Z" fill="white" />
                                <path d="M115.075 36.8785H119.005V43.3931H113.746C106.265 43.3931 101.639 38.6381 101.639 30.8839V14.4683H95.4922V13.0332L107.407 0.00390625H108.611V8.21172H118.817V14.4644H108.678V30.2973C108.678 34.5322 110.958 36.8785 115.079 36.8785H115.075Z" fill="white" />
                                <path d="M154.834 25.9276C154.834 26.7097 154.771 27.4918 154.642 28.2739H126.879C127.766 34.0064 131.759 37.5257 137.335 37.5257C141.456 37.5257 144.749 35.5706 146.591 32.3132H154.005C151.279 39.739 145.003 44.3024 137.335 44.3024C127.32 44.3024 119.777 36.3526 119.777 25.7986C119.777 15.2446 127.32 7.36133 137.335 7.36133C147.858 7.36133 154.83 15.7021 154.83 25.9276H154.834ZM137.339 13.9385C132.079 13.9385 128.212 17.1958 127.07 22.4083H147.732C146.465 17.0668 142.598 13.9385 137.339 13.9385Z" fill="white" />
                                <path d="M182.963 32.5404H174.231L186.78 48.8231H195.511L189.071 40.4667C192.845 37.0021 195.132 31.9734 195.132 26.1783C195.132 15.245 186.92 6.99414 175.925 6.99414C164.929 6.99414 156.611 15.2997 156.611 26.1783C156.611 37.0569 164.874 45.4133 175.925 45.4133C177.907 45.4133 179.8 45.1474 181.567 44.6429L176.222 37.8976C176.124 37.8976 176.022 37.8976 175.921 37.8976C169.465 37.8976 164.561 32.7985 164.561 26.1783C164.561 19.5581 169.469 14.5098 175.921 14.5098C182.373 14.5098 187.178 19.5033 187.178 26.1783C187.178 29.3496 186.091 32.1533 184.257 34.2219L182.963 32.5404Z" fill="white" />
                                <path d="M163.387 61.5275V52.0723H164.599V61.5275H163.387Z" fill="white" />
                                <path d="M153.342 61.5275L157.154 52.0723H158.327L162.14 61.5275H160.822L159.95 59.3533H155.504L154.632 61.5275H153.338H153.342ZM155.97 58.1646H159.477L157.721 53.6403L155.966 58.1646H155.97Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_299_1571">
                                    <rect width="195.513" height="61.528" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>

                    {/* Paragraph */}
                    <div className="flex flex-col gap-4 max-w-4xl">
                        <p className="text-white/60 leading-relaxed">
                        Stop waiting on infrastructure, fighting for allocation, and bracing for surprise bills. Start shipping on your timeline, not your provider&apos;s.
                        </p>
                    </div>
                </div>

                {/* Row 2: Email + Social | Link Columns */}
                <div className="flex flex-col lg:flex-row lg:justify-between gap-16 items-start">
                    {/* Email + Social */}
                    <div className="flex flex-col gap-12">
                        <a href="mailto:info@synteq.ai" className="text-2xl text-white hover:text-accent transition-colors">
                            info@synteq.ai
                        </a>
                        <div className="flex gap-6">
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

                    {/* Link Columns */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-16 w-full max-w-4xl">
                        {/* Product */}
                        <div className="flex flex-col gap-4">
                            <h3 className="font-mono text-xs text-accent uppercase tracking-wider mb-2">Product</h3>
                            <Link href="/clusters" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                                Clusters
                            </Link>
                            <Link href="/compute" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                                Compute
                            </Link>
                            <Link href="/cloud" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                                Cloud Platform
                            </Link>
                            <Link href="/cloud" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                                Model Library
                            </Link>
                            <Link href="/cloud" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                                API
                            </Link>
                            <Link href="/cloud" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                                Pricing
                            </Link>
                        </div>

                        {/* Resources */}
                        <div className="flex flex-col gap-4">
                            <h3 className="font-mono text-xs text-accent uppercase tracking-wider mb-2">Resources</h3>
                            <Link href="/cloud" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                                Documentation
                            </Link>
                            <Link href="/cloud" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                                API Reference
                            </Link>
                            <Link href="/cloud" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                                Guides
                            </Link>
                            <Link href="/about" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                                Case Studies
                            </Link>
                            <Link href="/blogs" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                                Blog
                            </Link>
                            <Link href="/blogs" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                                Research
                            </Link>
                        </div>

                        {/* Company */}
                        <div className="flex flex-col gap-4">
                            <h3 className="font-mono text-xs text-accent uppercase tracking-wider mb-2">Company</h3>
                            <Link href="/about" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                                About
                            </Link>
                            <Link href="/about" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                                Customers
                            </Link>
                            <Link href="/about" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                                Careers
                            </Link>
                            <Link href="/contact" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                                Contact Sales
                            </Link>
                            <Link href="/about" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                                Partners
                            </Link>
                        </div>

                        {/* Legal */}
                        <div className="flex flex-col gap-4">
                            <h3 className="font-mono text-xs text-accent uppercase tracking-wider mb-2">Legal</h3>
                            <Link href="#" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                                Privacy Policy
                            </Link>
                            <Link href="#" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                                Terms of Service
                            </Link>
                            <Link href="#" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                                Security
                            </Link>
                            <Link href="#" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                                Compliance
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Row 3: Copyright */}
                <div className="pt-12">
                    <p className="font-mono text-xs text-white/40">
                        © 2025 Synteq Digital — All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    )
}
