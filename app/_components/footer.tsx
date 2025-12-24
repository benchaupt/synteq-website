import Link from "next/link"

export const Footer = () => {
    return (
        <footer className="border-t border-white/5">
            <div className="max-w-viewport w-full mx-auto px-5 py-24 flex flex-col gap-20">
                {/* Top Section - Logo & Description */}
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <div className="flex flex-col gap-6">
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
                        <p className="text-white/60 max-w-md leading-relaxed">
                            Production-ready AI infrastructure that scales. Deploy and run AI models without the complexity.
                        </p>
                        <p className="font-mono text-sm text-accent uppercase tracking-wide">
                            Inference-first infrastructure
                        </p>
                    </div>

                    {/* Newsletter Section */}
                    <div className="flex flex-col gap-6 lg:items-end">
                        <div className="flex flex-col gap-4 w-full max-w-md">
                            <h3 className="text-xl font-medium">Stay updated</h3>
                            <p className="text-white/60 text-sm">Get the latest on AI infrastructure, model releases, and platform updates.</p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input 
                                    type="email" 
                                    placeholder="your@email.com"
                                    className="flex-1 bg-background-secondary border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-accent/50 transition-colors placeholder:text-white/30"
                                />
                                <button className="bg-accent hover:bg-darker-accent text-background font-medium px-6 py-3 rounded transition-colors duration-200 text-sm">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    {/* Product */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-mono text-xs text-accent uppercase tracking-wider mb-2">Product</h3>
                        <Link href="/hardware" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                            Hardware
                        </Link>
                        <Link href="/cloud" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                            Cloud Platform
                        </Link>
                        <Link href="#" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                            Model Library
                        </Link>
                        <Link href="#" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                            API
                        </Link>
                        <Link href="#" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                            Pricing
                        </Link>
                    </div>

                    {/* Resources */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-mono text-xs text-accent uppercase tracking-wider mb-2">Resources</h3>
                        <Link href="#" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                            Documentation
                        </Link>
                        <Link href="#" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                            API Reference
                        </Link>
                        <Link href="#" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                            Guides
                        </Link>
                        <Link href="#" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                            Case Studies
                        </Link>
                        <Link href="#" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                            Blog
                        </Link>
                        <Link href="#" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                            Research
                        </Link>
                    </div>

                    {/* Company */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-mono text-xs text-accent uppercase tracking-wider mb-2">Company</h3>
                        <Link href="#" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                            About
                        </Link>
                        <Link href="#" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                            Customers
                        </Link>
                        <Link href="#" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                            Careers
                        </Link>
                        <Link href="#" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                            Contact Sales
                        </Link>
                        <Link href="#" className="text-white/70 hover:text-accent transition-colors duration-200 text-sm">
                            Partners
                        </Link>
                    </div>

                    {/* Legal & Connect */}
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

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-8 border-t border-white/5">
                    <p className="font-mono text-xs text-white/40">
                        © 2025 Synteq AI — All rights reserved
                    </p>
                    
                    {/* Social Links */}
                    <div className="flex flex-row gap-6 items-center">
                        <Link href="#" className="text-white/40 hover:text-accent transition-colors duration-200" aria-label="Twitter">
                            <svg width="18" height="16" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-5">
                                <g clipPath="url(#clip0_2235_1934)">
                                    <path d="M18.6684 1.92652C18.6041 1.85934 18.5208 1.81393 18.4298 1.79655C18.3389 1.77917 18.2449 1.79068 18.1607 1.82948L18.0869 1.86333L17.8991 1.94909C18.0813 1.65943 18.2249 1.34681 18.3262 1.01929C18.3555 0.930222 18.3567 0.834141 18.3294 0.744407C18.3021 0.654679 18.2477 0.575767 18.1739 0.518661C18.1001 0.46155 18.0105 0.429085 17.9175 0.425783C17.8246 0.422477 17.7329 0.448498 17.6553 0.500226C17.1838 0.795046 16.6773 1.02859 16.1479 1.19532C15.5481 0.613277 14.7922 0.221743 13.9739 0.0693015C13.1556 -0.0831393 12.3109 0.0102213 11.5447 0.337799C10.7785 0.665376 10.1245 1.21275 9.66381 1.91202C9.2031 2.61128 8.95604 3.43165 8.95318 4.27135V4.49701L8.50588 4.46091C4.15821 3.94185 2.91473 0.989952 2.86777 0.863572C2.82704 0.758958 2.76115 0.666222 2.67603 0.593727C2.59091 0.521232 2.48925 0.471261 2.38021 0.448319C2.27122 0.425651 2.15835 0.430696 2.05176 0.463002C1.94518 0.495304 1.84824 0.553855 1.76966 0.633377C1.6802 0.723649 0.901912 1.56318 0.901912 3.14294C0.921154 4.17835 1.33155 5.16727 2.04922 5.90751C1.88196 5.80648 1.72269 5.69258 1.57285 5.56672C1.47227 5.47466 1.34637 5.41553 1.21178 5.3972C1.0772 5.37887 0.940263 5.40216 0.819083 5.46406C0.697906 5.52592 0.598189 5.62346 0.53311 5.74372C0.468036 5.86402 0.440665 6.00137 0.454617 6.1377C0.454617 6.2325 0.653663 8.04019 2.7224 9.40332L2.34443 9.47326C2.23223 9.49436 2.12721 9.544 2.03931 9.61744C1.95141 9.69092 1.88354 9.78581 1.84211 9.89313C1.8007 10.0004 1.78709 10.1167 1.80259 10.2308C1.81808 10.3449 1.86217 10.4531 1.93069 10.5452C1.97765 10.6084 2.85211 11.7549 4.74862 12.4139C3.43558 12.8521 2.06127 13.0746 0.678263 13.0729C0.54829 13.0718 0.42081 13.1089 0.31132 13.1796C0.20183 13.2503 0.115043 13.3515 0.0615071 13.471C0.00797141 13.5905 -0.0100083 13.7232 0.00975321 13.8528C0.0295147 13.9824 0.0861661 14.1035 0.172823 14.2012C0.24439 14.2848 1.99107 16.2324 6.49308 16.2324C13.9696 16.2324 17.4518 9.23628 17.4518 4.49701V4.27135C17.4518 4.20364 17.4518 4.13819 17.4518 4.07274C17.9658 3.5987 18.4055 3.04852 18.7556 2.44107C18.7957 2.35676 18.8088 2.26196 18.7932 2.16979C18.7776 2.07761 18.734 1.99261 18.6684 1.92652Z" fill="currentColor" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2235_1934">
                                        <rect width="18.7976" height="16.2343" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </Link>
                        <Link href="#" className="text-white/40 hover:text-accent transition-colors duration-200" aria-label="LinkedIn">
                            <svg width="18" height="17" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-5">
                                <g clipPath="url(#clip0_2235_1936)">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.10092 1.92644C4.10092 2.99146 3.23755 3.85483 2.17253 3.85483C1.10751 3.85483 0.244141 2.99146 0.244141 1.92644C0.244141 0.861418 1.10751 -0.00195312 2.17253 -0.00195312C3.23755 -0.00195312 4.10092 0.861418 4.10092 1.92644ZM4.10092 17.6291V4.95674H0.244141V17.6291H4.10092ZM13.4674 4.95674C11.2635 4.95674 10.652 5.67852 10.1616 6.60967V4.95674H6.30482V17.6291H10.1616V10.4665C10.1616 9.3645 10.1616 8.2626 12.09 8.2626C14.0183 8.2626 14.0183 9.3645 14.0183 10.4665V17.6291H17.8751V10.4665C17.8751 7.16062 17.3242 4.95674 13.4674 4.95674Z" fill="currentColor" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2235_1936">
                                        <rect width="18.1075" height="17.631" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </Link>
                        <Link href="#" className="text-white/40 hover:text-accent transition-colors duration-200" aria-label="GitHub">
                            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-5">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.475 0 0 4.475 0 10C0 14.425 2.8625 18.1625 6.8375 19.4875C7.3375 19.575 7.525 19.275 7.525 19.0125C7.525 18.775 7.5125 17.9875 7.5125 17.15C5 17.6125 4.35 16.5375 4.15 15.975C4.0375 15.6875 3.55 14.8 3.125 14.5625C2.775 14.375 2.275 13.9125 3.1125 13.9C3.9 13.8875 4.4625 14.625 4.65 14.925C5.55 16.4375 6.9875 16.0125 7.5625 15.75C7.65 15.1 7.9125 14.6625 8.2 14.4125C5.975 14.1625 3.65 13.3 3.65 9.475C3.65 8.3875 4.0375 7.4875 4.675 6.7875C4.575 6.5375 4.225 5.5125 4.775 4.1375C4.775 4.1375 5.6125 3.875 7.525 5.1625C8.325 4.9375 9.175 4.825 10.025 4.825C10.875 4.825 11.725 4.9375 12.525 5.1625C14.4375 3.8625 15.275 4.1375 15.275 4.1375C15.825 5.5125 15.475 6.5375 15.375 6.7875C16.0125 7.4875 16.4 8.375 16.4 9.475C16.4 13.3125 14.0625 14.1625 11.8375 14.4125C12.2 14.725 12.5125 15.325 12.5125 16.2625C12.5125 17.6 12.5 18.675 12.5 19.0125C12.5 19.275 12.6875 19.5875 13.1875 19.4875C15.1727 18.8173 16.8977 17.5415 18.1198 15.8395C19.3419 14.1376 19.9995 12.0953 20 10C20 4.475 15.525 0 10 0Z" fill="currentColor"/>
                            </svg>
                        </Link>
                        <Link href="#" className="text-white/40 hover:text-accent transition-colors duration-200" aria-label="Discord">
                            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-5">
                                <path d="M16.9308 1.34375C15.6561 0.753906 14.2892 0.328125 12.8599 0.09375C12.8339 0.0887472 12.8079 0.100781 12.7945 0.124219C12.6177 0.441406 12.4211 0.855469 12.2839 1.18359C10.7425 0.964844 9.20927 0.964844 7.70177 1.18359C7.56458 0.847656 7.36036 0.441406 7.18333 0.124219C7.16989 0.101562 7.14395 0.0898438 7.11802 0.09375C5.68911 0.327344 4.32224 0.753125 3.04724 1.34375C3.03536 1.34883 3.02505 1.35742 3.01786 1.36875C0.444584 5.24297 -0.265885 9.01875 0.0827827 12.75C0.0842202 12.768 0.0945765 12.7852 0.108646 12.7969C1.81786 14.0547 3.47474 14.8289 5.10052 15.3359C5.12645 15.3437 5.15395 15.3336 5.17005 15.3117C5.55677 14.7789 5.90286 14.2188 6.20114 13.6313C6.21833 13.5969 6.20192 13.5562 6.16536 13.5422C5.61317 13.3328 5.08724 13.0773 4.58052 12.7859C4.54005 12.7625 4.53693 12.707 4.57349 12.6797C4.67895 12.5992 4.78442 12.5156 4.88518 12.4313C4.90286 12.4164 4.92755 12.4133 4.94833 12.4227C8.24474 13.9453 11.7838 13.9453 15.0442 12.4227C15.065 12.4125 15.0897 12.4156 15.1081 12.4305C15.2089 12.5148 15.3144 12.5992 15.4206 12.6797C15.4572 12.707 15.4548 12.7625 15.4144 12.7859C14.9076 13.0828 14.3817 13.3328 13.8288 13.5414C13.7922 13.5555 13.7765 13.5969 13.7937 13.6313C14.0997 14.218 14.4458 14.7781 14.8245 15.3109C14.8399 15.3336 14.8681 15.3437 14.894 15.3359C16.5276 14.8289 18.1845 14.0547 19.8937 12.7969C19.9085 12.7852 19.9181 12.7687 19.9196 12.7508C20.3347 8.45391 19.2137 4.70859 16.9567 1.36953C16.9503 1.35742 16.9399 1.34883 16.9308 1.34375ZM6.68286 10.4531C5.69692 10.4531 4.88286 9.54844 4.88286 8.4375C4.88286 7.32656 5.68145 6.42188 6.68286 6.42188C7.69239 6.42188 8.49911 7.33437 8.48286 8.4375C8.48286 9.54844 7.68427 10.4531 6.68286 10.4531ZM13.3261 10.4531C12.3402 10.4531 11.5261 9.54844 11.5261 8.4375C11.5261 7.32656 12.3246 6.42188 13.3261 6.42188C14.3356 6.42188 15.1423 7.33437 15.1261 8.4375C15.1261 9.54844 14.3356 10.4531 13.3261 10.4531Z" fill="currentColor"/>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}