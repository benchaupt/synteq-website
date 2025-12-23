import { Blog } from "@/app/(marketing)/_components/blog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/_components/accordion";
import { AnimatedButton } from "@/app/_components/animated-button";
import { AnimatedCard } from "@/app/_components/animated-card";
import { CallToAction } from "@/app/_components/call-to-action";
import { Footer } from "@/app/_components/footer";
import { Navigation } from "@/app/_components/navigation";
import { ScrollRevealText } from "@/app/_components/scroll-reveal-text";
import { Statistics } from "@/app/_components/statistics";
import { TestimonialCarousel } from "@/app/_components/testimonial-carousel";
import Link from "next/link";

export default function Cloud() {
  return (
    <>
      <div className="flex flex-col bg-white text-black">
        <Navigation />
        <div className="px-5 max-w-viewport w-full mx-auto flex flex-col gap-10">
          <div className="pt-32 grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-12 items-center justify-center">
              <h1 className="text-8xl">
                Lorem ipsum dolor sit amet, consectetur
              </h1>
              <p className="text-2xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor, ex vitae vehicula sodales, urna sapien interdum orci, sed accumsan erat magna eget enim. Integer quis libero in turpis sodales blandit.
              </p>
            </div>
            <div className="flex flex-col gap-4 items-end justify-center">
              <img src="/assets/cloud/Isolation_Mode.png" alt="Isolation Mode" className="h-[600px] object-cover" />
            </div>
          </div>
          <div className="flex flex-row gap-10 pb-32">
            <AnimatedButton>
              Talk To Sales
            </AnimatedButton>
          </div>
          <Statistics />
          <div className="py-32 grid grid-cols-2 gap-10 w-full">
            <div className="bg-dark text-white px-10 pr-4 py-5 grid grid-cols-3">
              <img src="/assets/cloud/Group 33.png" className="object-contain min-h-[250px]" />
              <div className="col-span-2 flex items-center justify-center p-10 pl-20 pr-4">
                <p className="text-white/50 text-xl"><span className="text-white">Lorem ipsum</span> dolor sit amet, consectetur adipiscing elit. Phasellus porttitor, ex <span className="text-white">vitae vehicula sodales</span>, urna sapien interdum orci, sed accumsan erat magna eget enim. Integer quis libero in turpis <span className="text-white">sodales blandit.</span></p>
              </div>
            </div>
            <div className="bg-dark text-white px-10 pr-4 py-5 grid grid-cols-3">
              <img src="/assets/cloud/Layer_1.png" className="object-contain min-h-[250px]" />
              <div className="col-span-2 flex items-center justify-center p-10 pl-20 pr-4">
                <p className="text-white/50 text-xl"><span className="text-white">Lorem ipsum</span> dolor sit amet, consectetur adipiscing elit. Phasellus porttitor, ex <span className="text-white">vitae vehicula sodales</span>, urna sapien interdum orci, sed accumsan erat magna eget enim. Integer quis libero in turpis <span className="text-white">sodales blandit.</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-dark max-w-viewport w-full mx-auto px-5">
        <ScrollRevealText
          text={`Synteq AI gives you production-ready AI environments without forcing you to become an infrastructure expert. No cloud gymnastics. No GPU babysitting. No "DevOps first, product later" workflow.`}
          className="py-48"
        />

        {/* model foundary */}
        <div className="py-32 flex flex-col gap-12">
          <div className="flex flex-col gap-8">
            <h2 className="text-6xl">Model Foundry</h2>
            <span className="text-dark-foreground text-2xl max-w-3xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor, ex vitae vehicula sodales, urna sapien interdum orci, sed accumsan erat magna eget enim. Integer quis libero in turpis sodales blandit.</span>
          </div>
          <div className="grid grid-cols-3 gap-10">
            {[...Array(9)].map((_, index) => (
              <AnimatedCard key={index}>
                <div className="flex flex-col gap-4">
                  <svg width="47" height="41" viewBox="0 0 47 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M31.5852 5.59068L27.6501 14.3371C27.3086 15.0964 26.8132 15.7777 26.1953 16.3385C25.5774 16.8992 24.8497 17.3276 24.058 17.5966H27.3438V17.6118C28.8514 17.7213 30.2613 18.3942 31.2905 19.495C32.3197 20.5959 32.8917 22.0433 32.8915 23.5463V36.5789H26.9076V20.8556C26.532 21.6592 25.9333 22.3395 25.1819 22.8161C24.4305 23.2928 23.5575 23.5463 22.6662 23.5463H12.1148V36.5789H6.13086V5.64321H12.1131V17.5979H19.6001L24.8959 5.59068H31.5852Z" fill="currentColor" />
                    <path d="M37.0945 4.3152C37.8321 4.24602 38.556 4.32146 39.2271 4.67814C40.1084 5.14704 40.6219 5.86183 40.7888 6.84879C40.9218 7.63588 40.8969 8.40456 40.6728 9.16705C40.2754 10.5169 39.2996 11.2165 37.9621 11.3933C36.852 11.5409 35.7263 11.5593 34.6069 11.6347C34.5203 11.6408 34.4321 11.6347 34.3316 11.6347C34.5836 11.3134 34.8049 11.0199 35.0383 10.7356C35.1466 10.6018 35.137 10.4999 35.0319 10.36C34.0192 9.03641 33.9235 7.56678 34.5064 6.0756C34.9439 4.95337 35.9117 4.42748 37.0945 4.3152Z" fill="currentColor" />
                  </svg>
                  <div className="flex flex-col gap-2">
                    <h2 className="font-medium text-3xl">Kimi-K2-Thinking</h2>
                    <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
          <div className="flex items-center justify-center">
            <Link href="#">View More</Link>
          </div>
        </div>

        {/* features/benefits */}
        <div className="grid grid-cols-3 gap-28 py-32">
          {[...Array(6)].map((_, index) => (
            <div className="flex flex-col gap-4" key={index}>
              <div className="flex flex-row gap-4 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z" />
                </svg>
                <h2 className="text-3xl">Random benifit</h2>
              </div>
              <p className="text-dark-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor, ex vitae vehicula sodales.</p>
            </div>
          ))}

        </div>


        {/* carousel */}
        <div className="py-32">
          <TestimonialCarousel
            testimonials={[
              {
                logo: <svg className="h-7" viewBox="0 0 200 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_383_1232)">
                    <path d="M151.155 29.299H113.764V3.21166C113.764 2.35987 113.426 1.54297 112.823 0.940672C112.221 0.338372 111.403 0 110.551 0C109.699 0 108.882 0.338372 108.279 0.940672C107.676 1.54297 107.338 2.35987 107.338 3.21166V32.3647C107.374 33.2441 107.74 34.0779 108.363 34.7C108.986 35.3222 109.82 35.6872 110.7 35.7223H151.155C151.577 35.7223 151.995 35.6393 152.385 35.4778C152.775 35.3164 153.129 35.0799 153.427 34.7817C153.726 34.4834 153.963 34.1294 154.123 33.7398C154.286 33.35 154.369 32.9324 154.369 32.5107C154.369 32.089 154.286 31.6714 154.123 31.2816C153.963 30.892 153.726 30.5379 153.427 30.2397C153.129 29.9415 152.775 29.7048 152.385 29.5435C151.995 29.3821 151.577 29.299 151.155 29.299Z" fill="white" />
                    <path d="M197.145 1.57875C196.821 1.30579 196.446 1.09947 196.042 0.971648C195.64 0.843824 195.214 0.797018 194.793 0.833919C194.371 0.870819 193.96 0.990699 193.584 1.18667C193.209 1.38264 192.877 1.65083 192.605 1.97583L171.377 27.2487L150.152 1.96414C149.879 1.63871 149.546 1.37041 149.169 1.17472C148.792 0.97902 148.381 0.859812 147.958 0.82398C147.535 0.788147 147.109 0.836399 146.705 0.965945C146.301 1.09549 145.926 1.30376 145.603 1.57875C145.279 1.8499 145.01 2.18263 144.814 2.55778C144.617 2.93294 144.498 3.34314 144.462 3.76479C144.424 4.18643 144.471 4.61122 144.599 5.01472C144.727 5.41821 144.933 5.79245 145.207 6.11593L168.751 34.1624C169.085 34.5235 169.491 34.8116 169.941 35.0086C170.392 35.2056 170.879 35.3074 171.371 35.3074C171.864 35.3074 172.35 35.2056 172.801 35.0086C173.252 34.8116 173.658 34.5235 173.991 34.1624L197.536 6.11593C197.809 5.79281 198.016 5.41887 198.145 5.01558C198.272 4.61231 198.32 4.18764 198.284 3.76601C198.248 3.34438 198.128 2.93409 197.933 2.55872C197.737 2.18335 197.469 1.85031 197.145 1.57875Z" fill="white" />
                    <path d="M47.0483 18.2531C46.8701 8.86634 39.0355 1.43575 29.6849 1.43575H3.19576C2.36296 1.42633 1.56008 1.74583 0.961667 2.32481C0.363249 2.90378 0.0176562 3.69544 5.37623e-06 4.52768V32.5099C-0.00155303 33.3643 0.335746 34.1845 0.93802 34.7909C1.5403 35.3972 2.35845 35.7403 3.21329 35.7449H29.9624C32.2393 35.7381 34.4921 35.2778 36.5891 34.3912C38.686 33.5045 40.5853 32.2091 42.1759 30.5808C43.7666 28.9524 45.0167 27.0236 45.8532 24.9069C46.6898 22.7904 47.0961 20.5284 47.0483 18.2531ZM29.9711 29.2632H6.44409V7.90867H29.7434C35.5302 7.90867 40.4289 12.4546 40.6012 18.2618C40.6458 19.6869 40.4041 21.1065 39.8904 22.4366C39.3767 23.7667 38.6015 24.9804 37.6105 26.0061C36.6195 27.0316 35.4329 27.8482 34.1208 28.4077C32.8086 28.9671 31.3977 29.258 29.9711 29.2632Z" fill="white" />
                    <path d="M95.9039 15.4434H55.5042C53.7263 15.4434 52.2852 16.8839 52.2852 18.6609C52.2852 20.4379 53.7263 21.8784 55.5042 21.8784H95.9039C97.6818 21.8784 99.1231 20.4379 99.1231 18.6609C99.1231 16.8839 97.6818 15.4434 95.9039 15.4434Z" fill="white" />
                    <path d="M95.9039 1.55078H55.5042C53.7263 1.55078 52.2852 2.9913 52.2852 4.76827C52.2852 6.54523 53.7263 7.98574 55.5042 7.98574H95.9039C97.6818 7.98574 99.1231 6.54523 99.1231 4.76827C99.1231 2.9913 97.6818 1.55078 95.9039 1.55078Z" fill="white" />
                    <path d="M95.9039 29.3359H55.5042C53.7263 29.3359 52.2852 30.7765 52.2852 32.5535C52.2852 34.3304 53.7263 35.771 55.5042 35.771H95.9039C97.6818 35.771 99.1231 34.3304 99.1231 32.5535C99.1231 30.7765 97.6818 29.3359 95.9039 29.3359Z" fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_383_1232">
                      <rect width="199.461" height="36.1228" fill="white" />
                    </clipPath>
                  </defs>
                </svg>,
                name: "Joe Stefanelli",
                title: "CTO",
                company: "Delv",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              },
              {
                logo: <svg className="h-7" viewBox="0 0 200 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_383_1232)">
                    <path d="M151.155 29.299H113.764V3.21166C113.764 2.35987 113.426 1.54297 112.823 0.940672C112.221 0.338372 111.403 0 110.551 0C109.699 0 108.882 0.338372 108.279 0.940672C107.676 1.54297 107.338 2.35987 107.338 3.21166V32.3647C107.374 33.2441 107.74 34.0779 108.363 34.7C108.986 35.3222 109.82 35.6872 110.7 35.7223H151.155C151.577 35.7223 151.995 35.6393 152.385 35.4778C152.775 35.3164 153.129 35.0799 153.427 34.7817C153.726 34.4834 153.963 34.1294 154.123 33.7398C154.286 33.35 154.369 32.9324 154.369 32.5107C154.369 32.089 154.286 31.6714 154.123 31.2816C153.963 30.892 153.726 30.5379 153.427 30.2397C153.129 29.9415 152.775 29.7048 152.385 29.5435C151.995 29.3821 151.577 29.299 151.155 29.299Z" fill="white" />
                    <path d="M197.145 1.57875C196.821 1.30579 196.446 1.09947 196.042 0.971648C195.64 0.843824 195.214 0.797018 194.793 0.833919C194.371 0.870819 193.96 0.990699 193.584 1.18667C193.209 1.38264 192.877 1.65083 192.605 1.97583L171.377 27.2487L150.152 1.96414C149.879 1.63871 149.546 1.37041 149.169 1.17472C148.792 0.97902 148.381 0.859812 147.958 0.82398C147.535 0.788147 147.109 0.836399 146.705 0.965945C146.301 1.09549 145.926 1.30376 145.603 1.57875C145.279 1.8499 145.01 2.18263 144.814 2.55778C144.617 2.93294 144.498 3.34314 144.462 3.76479C144.424 4.18643 144.471 4.61122 144.599 5.01472C144.727 5.41821 144.933 5.79245 145.207 6.11593L168.751 34.1624C169.085 34.5235 169.491 34.8116 169.941 35.0086C170.392 35.2056 170.879 35.3074 171.371 35.3074C171.864 35.3074 172.35 35.2056 172.801 35.0086C173.252 34.8116 173.658 34.5235 173.991 34.1624L197.536 6.11593C197.809 5.79281 198.016 5.41887 198.145 5.01558C198.272 4.61231 198.32 4.18764 198.284 3.76601C198.248 3.34438 198.128 2.93409 197.933 2.55872C197.737 2.18335 197.469 1.85031 197.145 1.57875Z" fill="white" />
                    <path d="M47.0483 18.2531C46.8701 8.86634 39.0355 1.43575 29.6849 1.43575H3.19576C2.36296 1.42633 1.56008 1.74583 0.961667 2.32481C0.363249 2.90378 0.0176562 3.69544 5.37623e-06 4.52768V32.5099C-0.00155303 33.3643 0.335746 34.1845 0.93802 34.7909C1.5403 35.3972 2.35845 35.7403 3.21329 35.7449H29.9624C32.2393 35.7381 34.4921 35.2778 36.5891 34.3912C38.686 33.5045 40.5853 32.2091 42.1759 30.5808C43.7666 28.9524 45.0167 27.0236 45.8532 24.9069C46.6898 22.7904 47.0961 20.5284 47.0483 18.2531ZM29.9711 29.2632H6.44409V7.90867H29.7434C35.5302 7.90867 40.4289 12.4546 40.6012 18.2618C40.6458 19.6869 40.4041 21.1065 39.8904 22.4366C39.3767 23.7667 38.6015 24.9804 37.6105 26.0061C36.6195 27.0316 35.4329 27.8482 34.1208 28.4077C32.8086 28.9671 31.3977 29.258 29.9711 29.2632Z" fill="white" />
                    <path d="M95.9039 15.4434H55.5042C53.7263 15.4434 52.2852 16.8839 52.2852 18.6609C52.2852 20.4379 53.7263 21.8784 55.5042 21.8784H95.9039C97.6818 21.8784 99.1231 20.4379 99.1231 18.6609C99.1231 16.8839 97.6818 15.4434 95.9039 15.4434Z" fill="white" />
                    <path d="M95.9039 1.55078H55.5042C53.7263 1.55078 52.2852 2.9913 52.2852 4.76827C52.2852 6.54523 53.7263 7.98574 55.5042 7.98574H95.9039C97.6818 7.98574 99.1231 6.54523 99.1231 4.76827C99.1231 2.9913 97.6818 1.55078 95.9039 1.55078Z" fill="white" />
                    <path d="M95.9039 29.3359H55.5042C53.7263 29.3359 52.2852 30.7765 52.2852 32.5535C52.2852 34.3304 53.7263 35.771 55.5042 35.771H95.9039C97.6818 35.771 99.1231 34.3304 99.1231 32.5535C99.1231 30.7765 97.6818 29.3359 95.9039 29.3359Z" fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_383_1232">
                      <rect width="199.461" height="36.1228" fill="white" />
                    </clipPath>
                  </defs>
                </svg>,
                name: "Joe Stefanelli",
                title: "CTO",
                company: "Delv",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              },
              {
                logo: <svg className="h-7" viewBox="0 0 200 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_383_1232)">
                    <path d="M151.155 29.299H113.764V3.21166C113.764 2.35987 113.426 1.54297 112.823 0.940672C112.221 0.338372 111.403 0 110.551 0C109.699 0 108.882 0.338372 108.279 0.940672C107.676 1.54297 107.338 2.35987 107.338 3.21166V32.3647C107.374 33.2441 107.74 34.0779 108.363 34.7C108.986 35.3222 109.82 35.6872 110.7 35.7223H151.155C151.577 35.7223 151.995 35.6393 152.385 35.4778C152.775 35.3164 153.129 35.0799 153.427 34.7817C153.726 34.4834 153.963 34.1294 154.123 33.7398C154.286 33.35 154.369 32.9324 154.369 32.5107C154.369 32.089 154.286 31.6714 154.123 31.2816C153.963 30.892 153.726 30.5379 153.427 30.2397C153.129 29.9415 152.775 29.7048 152.385 29.5435C151.995 29.3821 151.577 29.299 151.155 29.299Z" fill="white" />
                    <path d="M197.145 1.57875C196.821 1.30579 196.446 1.09947 196.042 0.971648C195.64 0.843824 195.214 0.797018 194.793 0.833919C194.371 0.870819 193.96 0.990699 193.584 1.18667C193.209 1.38264 192.877 1.65083 192.605 1.97583L171.377 27.2487L150.152 1.96414C149.879 1.63871 149.546 1.37041 149.169 1.17472C148.792 0.97902 148.381 0.859812 147.958 0.82398C147.535 0.788147 147.109 0.836399 146.705 0.965945C146.301 1.09549 145.926 1.30376 145.603 1.57875C145.279 1.8499 145.01 2.18263 144.814 2.55778C144.617 2.93294 144.498 3.34314 144.462 3.76479C144.424 4.18643 144.471 4.61122 144.599 5.01472C144.727 5.41821 144.933 5.79245 145.207 6.11593L168.751 34.1624C169.085 34.5235 169.491 34.8116 169.941 35.0086C170.392 35.2056 170.879 35.3074 171.371 35.3074C171.864 35.3074 172.35 35.2056 172.801 35.0086C173.252 34.8116 173.658 34.5235 173.991 34.1624L197.536 6.11593C197.809 5.79281 198.016 5.41887 198.145 5.01558C198.272 4.61231 198.32 4.18764 198.284 3.76601C198.248 3.34438 198.128 2.93409 197.933 2.55872C197.737 2.18335 197.469 1.85031 197.145 1.57875Z" fill="white" />
                    <path d="M47.0483 18.2531C46.8701 8.86634 39.0355 1.43575 29.6849 1.43575H3.19576C2.36296 1.42633 1.56008 1.74583 0.961667 2.32481C0.363249 2.90378 0.0176562 3.69544 5.37623e-06 4.52768V32.5099C-0.00155303 33.3643 0.335746 34.1845 0.93802 34.7909C1.5403 35.3972 2.35845 35.7403 3.21329 35.7449H29.9624C32.2393 35.7381 34.4921 35.2778 36.5891 34.3912C38.686 33.5045 40.5853 32.2091 42.1759 30.5808C43.7666 28.9524 45.0167 27.0236 45.8532 24.9069C46.6898 22.7904 47.0961 20.5284 47.0483 18.2531ZM29.9711 29.2632H6.44409V7.90867H29.7434C35.5302 7.90867 40.4289 12.4546 40.6012 18.2618C40.6458 19.6869 40.4041 21.1065 39.8904 22.4366C39.3767 23.7667 38.6015 24.9804 37.6105 26.0061C36.6195 27.0316 35.4329 27.8482 34.1208 28.4077C32.8086 28.9671 31.3977 29.258 29.9711 29.2632Z" fill="white" />
                    <path d="M95.9039 15.4434H55.5042C53.7263 15.4434 52.2852 16.8839 52.2852 18.6609C52.2852 20.4379 53.7263 21.8784 55.5042 21.8784H95.9039C97.6818 21.8784 99.1231 20.4379 99.1231 18.6609C99.1231 16.8839 97.6818 15.4434 95.9039 15.4434Z" fill="white" />
                    <path d="M95.9039 1.55078H55.5042C53.7263 1.55078 52.2852 2.9913 52.2852 4.76827C52.2852 6.54523 53.7263 7.98574 55.5042 7.98574H95.9039C97.6818 7.98574 99.1231 6.54523 99.1231 4.76827C99.1231 2.9913 97.6818 1.55078 95.9039 1.55078Z" fill="white" />
                    <path d="M95.9039 29.3359H55.5042C53.7263 29.3359 52.2852 30.7765 52.2852 32.5535C52.2852 34.3304 53.7263 35.771 55.5042 35.771H95.9039C97.6818 35.771 99.1231 34.3304 99.1231 32.5535C99.1231 30.7765 97.6818 29.3359 95.9039 29.3359Z" fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_383_1232">
                      <rect width="199.461" height="36.1228" fill="white" />
                    </clipPath>
                  </defs>
                </svg>,
                name: "Joe Stefanelli",
                title: "CTO",
                company: "Delv",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              },
              {
                logo: <svg className="h-7" viewBox="0 0 200 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_383_1232)">
                    <path d="M151.155 29.299H113.764V3.21166C113.764 2.35987 113.426 1.54297 112.823 0.940672C112.221 0.338372 111.403 0 110.551 0C109.699 0 108.882 0.338372 108.279 0.940672C107.676 1.54297 107.338 2.35987 107.338 3.21166V32.3647C107.374 33.2441 107.74 34.0779 108.363 34.7C108.986 35.3222 109.82 35.6872 110.7 35.7223H151.155C151.577 35.7223 151.995 35.6393 152.385 35.4778C152.775 35.3164 153.129 35.0799 153.427 34.7817C153.726 34.4834 153.963 34.1294 154.123 33.7398C154.286 33.35 154.369 32.9324 154.369 32.5107C154.369 32.089 154.286 31.6714 154.123 31.2816C153.963 30.892 153.726 30.5379 153.427 30.2397C153.129 29.9415 152.775 29.7048 152.385 29.5435C151.995 29.3821 151.577 29.299 151.155 29.299Z" fill="white" />
                    <path d="M197.145 1.57875C196.821 1.30579 196.446 1.09947 196.042 0.971648C195.64 0.843824 195.214 0.797018 194.793 0.833919C194.371 0.870819 193.96 0.990699 193.584 1.18667C193.209 1.38264 192.877 1.65083 192.605 1.97583L171.377 27.2487L150.152 1.96414C149.879 1.63871 149.546 1.37041 149.169 1.17472C148.792 0.97902 148.381 0.859812 147.958 0.82398C147.535 0.788147 147.109 0.836399 146.705 0.965945C146.301 1.09549 145.926 1.30376 145.603 1.57875C145.279 1.8499 145.01 2.18263 144.814 2.55778C144.617 2.93294 144.498 3.34314 144.462 3.76479C144.424 4.18643 144.471 4.61122 144.599 5.01472C144.727 5.41821 144.933 5.79245 145.207 6.11593L168.751 34.1624C169.085 34.5235 169.491 34.8116 169.941 35.0086C170.392 35.2056 170.879 35.3074 171.371 35.3074C171.864 35.3074 172.35 35.2056 172.801 35.0086C173.252 34.8116 173.658 34.5235 173.991 34.1624L197.536 6.11593C197.809 5.79281 198.016 5.41887 198.145 5.01558C198.272 4.61231 198.32 4.18764 198.284 3.76601C198.248 3.34438 198.128 2.93409 197.933 2.55872C197.737 2.18335 197.469 1.85031 197.145 1.57875Z" fill="white" />
                    <path d="M47.0483 18.2531C46.8701 8.86634 39.0355 1.43575 29.6849 1.43575H3.19576C2.36296 1.42633 1.56008 1.74583 0.961667 2.32481C0.363249 2.90378 0.0176562 3.69544 5.37623e-06 4.52768V32.5099C-0.00155303 33.3643 0.335746 34.1845 0.93802 34.7909C1.5403 35.3972 2.35845 35.7403 3.21329 35.7449H29.9624C32.2393 35.7381 34.4921 35.2778 36.5891 34.3912C38.686 33.5045 40.5853 32.2091 42.1759 30.5808C43.7666 28.9524 45.0167 27.0236 45.8532 24.9069C46.6898 22.7904 47.0961 20.5284 47.0483 18.2531ZM29.9711 29.2632H6.44409V7.90867H29.7434C35.5302 7.90867 40.4289 12.4546 40.6012 18.2618C40.6458 19.6869 40.4041 21.1065 39.8904 22.4366C39.3767 23.7667 38.6015 24.9804 37.6105 26.0061C36.6195 27.0316 35.4329 27.8482 34.1208 28.4077C32.8086 28.9671 31.3977 29.258 29.9711 29.2632Z" fill="white" />
                    <path d="M95.9039 15.4434H55.5042C53.7263 15.4434 52.2852 16.8839 52.2852 18.6609C52.2852 20.4379 53.7263 21.8784 55.5042 21.8784H95.9039C97.6818 21.8784 99.1231 20.4379 99.1231 18.6609C99.1231 16.8839 97.6818 15.4434 95.9039 15.4434Z" fill="white" />
                    <path d="M95.9039 1.55078H55.5042C53.7263 1.55078 52.2852 2.9913 52.2852 4.76827C52.2852 6.54523 53.7263 7.98574 55.5042 7.98574H95.9039C97.6818 7.98574 99.1231 6.54523 99.1231 4.76827C99.1231 2.9913 97.6818 1.55078 95.9039 1.55078Z" fill="white" />
                    <path d="M95.9039 29.3359H55.5042C53.7263 29.3359 52.2852 30.7765 52.2852 32.5535C52.2852 34.3304 53.7263 35.771 55.5042 35.771H95.9039C97.6818 35.771 99.1231 34.3304 99.1231 32.5535C99.1231 30.7765 97.6818 29.3359 95.9039 29.3359Z" fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_383_1232">
                      <rect width="199.461" height="36.1228" fill="white" />
                    </clipPath>
                  </defs>
                </svg>,
                name: "Joe Stefanelli",
                title: "CTO",
                company: "Delv",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              },
              {
                logo: <svg className="h-7" viewBox="0 0 200 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_383_1232)">
                    <path d="M151.155 29.299H113.764V3.21166C113.764 2.35987 113.426 1.54297 112.823 0.940672C112.221 0.338372 111.403 0 110.551 0C109.699 0 108.882 0.338372 108.279 0.940672C107.676 1.54297 107.338 2.35987 107.338 3.21166V32.3647C107.374 33.2441 107.74 34.0779 108.363 34.7C108.986 35.3222 109.82 35.6872 110.7 35.7223H151.155C151.577 35.7223 151.995 35.6393 152.385 35.4778C152.775 35.3164 153.129 35.0799 153.427 34.7817C153.726 34.4834 153.963 34.1294 154.123 33.7398C154.286 33.35 154.369 32.9324 154.369 32.5107C154.369 32.089 154.286 31.6714 154.123 31.2816C153.963 30.892 153.726 30.5379 153.427 30.2397C153.129 29.9415 152.775 29.7048 152.385 29.5435C151.995 29.3821 151.577 29.299 151.155 29.299Z" fill="white" />
                    <path d="M197.145 1.57875C196.821 1.30579 196.446 1.09947 196.042 0.971648C195.64 0.843824 195.214 0.797018 194.793 0.833919C194.371 0.870819 193.96 0.990699 193.584 1.18667C193.209 1.38264 192.877 1.65083 192.605 1.97583L171.377 27.2487L150.152 1.96414C149.879 1.63871 149.546 1.37041 149.169 1.17472C148.792 0.97902 148.381 0.859812 147.958 0.82398C147.535 0.788147 147.109 0.836399 146.705 0.965945C146.301 1.09549 145.926 1.30376 145.603 1.57875C145.279 1.8499 145.01 2.18263 144.814 2.55778C144.617 2.93294 144.498 3.34314 144.462 3.76479C144.424 4.18643 144.471 4.61122 144.599 5.01472C144.727 5.41821 144.933 5.79245 145.207 6.11593L168.751 34.1624C169.085 34.5235 169.491 34.8116 169.941 35.0086C170.392 35.2056 170.879 35.3074 171.371 35.3074C171.864 35.3074 172.35 35.2056 172.801 35.0086C173.252 34.8116 173.658 34.5235 173.991 34.1624L197.536 6.11593C197.809 5.79281 198.016 5.41887 198.145 5.01558C198.272 4.61231 198.32 4.18764 198.284 3.76601C198.248 3.34438 198.128 2.93409 197.933 2.55872C197.737 2.18335 197.469 1.85031 197.145 1.57875Z" fill="white" />
                    <path d="M47.0483 18.2531C46.8701 8.86634 39.0355 1.43575 29.6849 1.43575H3.19576C2.36296 1.42633 1.56008 1.74583 0.961667 2.32481C0.363249 2.90378 0.0176562 3.69544 5.37623e-06 4.52768V32.5099C-0.00155303 33.3643 0.335746 34.1845 0.93802 34.7909C1.5403 35.3972 2.35845 35.7403 3.21329 35.7449H29.9624C32.2393 35.7381 34.4921 35.2778 36.5891 34.3912C38.686 33.5045 40.5853 32.2091 42.1759 30.5808C43.7666 28.9524 45.0167 27.0236 45.8532 24.9069C46.6898 22.7904 47.0961 20.5284 47.0483 18.2531ZM29.9711 29.2632H6.44409V7.90867H29.7434C35.5302 7.90867 40.4289 12.4546 40.6012 18.2618C40.6458 19.6869 40.4041 21.1065 39.8904 22.4366C39.3767 23.7667 38.6015 24.9804 37.6105 26.0061C36.6195 27.0316 35.4329 27.8482 34.1208 28.4077C32.8086 28.9671 31.3977 29.258 29.9711 29.2632Z" fill="white" />
                    <path d="M95.9039 15.4434H55.5042C53.7263 15.4434 52.2852 16.8839 52.2852 18.6609C52.2852 20.4379 53.7263 21.8784 55.5042 21.8784H95.9039C97.6818 21.8784 99.1231 20.4379 99.1231 18.6609C99.1231 16.8839 97.6818 15.4434 95.9039 15.4434Z" fill="white" />
                    <path d="M95.9039 1.55078H55.5042C53.7263 1.55078 52.2852 2.9913 52.2852 4.76827C52.2852 6.54523 53.7263 7.98574 55.5042 7.98574H95.9039C97.6818 7.98574 99.1231 6.54523 99.1231 4.76827C99.1231 2.9913 97.6818 1.55078 95.9039 1.55078Z" fill="white" />
                    <path d="M95.9039 29.3359H55.5042C53.7263 29.3359 52.2852 30.7765 52.2852 32.5535C52.2852 34.3304 53.7263 35.771 55.5042 35.771H95.9039C97.6818 35.771 99.1231 34.3304 99.1231 32.5535C99.1231 30.7765 97.6818 29.3359 95.9039 29.3359Z" fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_383_1232">
                      <rect width="199.461" height="36.1228" fill="white" />
                    </clipPath>
                  </defs>
                </svg>,
                name: "Joe Stefanelli",
                title: "CTO",
                company: "Delv",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              },
              {
                logo: <svg className="h-7" viewBox="0 0 200 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_383_1232)">
                    <path d="M151.155 29.299H113.764V3.21166C113.764 2.35987 113.426 1.54297 112.823 0.940672C112.221 0.338372 111.403 0 110.551 0C109.699 0 108.882 0.338372 108.279 0.940672C107.676 1.54297 107.338 2.35987 107.338 3.21166V32.3647C107.374 33.2441 107.74 34.0779 108.363 34.7C108.986 35.3222 109.82 35.6872 110.7 35.7223H151.155C151.577 35.7223 151.995 35.6393 152.385 35.4778C152.775 35.3164 153.129 35.0799 153.427 34.7817C153.726 34.4834 153.963 34.1294 154.123 33.7398C154.286 33.35 154.369 32.9324 154.369 32.5107C154.369 32.089 154.286 31.6714 154.123 31.2816C153.963 30.892 153.726 30.5379 153.427 30.2397C153.129 29.9415 152.775 29.7048 152.385 29.5435C151.995 29.3821 151.577 29.299 151.155 29.299Z" fill="white" />
                    <path d="M197.145 1.57875C196.821 1.30579 196.446 1.09947 196.042 0.971648C195.64 0.843824 195.214 0.797018 194.793 0.833919C194.371 0.870819 193.96 0.990699 193.584 1.18667C193.209 1.38264 192.877 1.65083 192.605 1.97583L171.377 27.2487L150.152 1.96414C149.879 1.63871 149.546 1.37041 149.169 1.17472C148.792 0.97902 148.381 0.859812 147.958 0.82398C147.535 0.788147 147.109 0.836399 146.705 0.965945C146.301 1.09549 145.926 1.30376 145.603 1.57875C145.279 1.8499 145.01 2.18263 144.814 2.55778C144.617 2.93294 144.498 3.34314 144.462 3.76479C144.424 4.18643 144.471 4.61122 144.599 5.01472C144.727 5.41821 144.933 5.79245 145.207 6.11593L168.751 34.1624C169.085 34.5235 169.491 34.8116 169.941 35.0086C170.392 35.2056 170.879 35.3074 171.371 35.3074C171.864 35.3074 172.35 35.2056 172.801 35.0086C173.252 34.8116 173.658 34.5235 173.991 34.1624L197.536 6.11593C197.809 5.79281 198.016 5.41887 198.145 5.01558C198.272 4.61231 198.32 4.18764 198.284 3.76601C198.248 3.34438 198.128 2.93409 197.933 2.55872C197.737 2.18335 197.469 1.85031 197.145 1.57875Z" fill="white" />
                    <path d="M47.0483 18.2531C46.8701 8.86634 39.0355 1.43575 29.6849 1.43575H3.19576C2.36296 1.42633 1.56008 1.74583 0.961667 2.32481C0.363249 2.90378 0.0176562 3.69544 5.37623e-06 4.52768V32.5099C-0.00155303 33.3643 0.335746 34.1845 0.93802 34.7909C1.5403 35.3972 2.35845 35.7403 3.21329 35.7449H29.9624C32.2393 35.7381 34.4921 35.2778 36.5891 34.3912C38.686 33.5045 40.5853 32.2091 42.1759 30.5808C43.7666 28.9524 45.0167 27.0236 45.8532 24.9069C46.6898 22.7904 47.0961 20.5284 47.0483 18.2531ZM29.9711 29.2632H6.44409V7.90867H29.7434C35.5302 7.90867 40.4289 12.4546 40.6012 18.2618C40.6458 19.6869 40.4041 21.1065 39.8904 22.4366C39.3767 23.7667 38.6015 24.9804 37.6105 26.0061C36.6195 27.0316 35.4329 27.8482 34.1208 28.4077C32.8086 28.9671 31.3977 29.258 29.9711 29.2632Z" fill="white" />
                    <path d="M95.9039 15.4434H55.5042C53.7263 15.4434 52.2852 16.8839 52.2852 18.6609C52.2852 20.4379 53.7263 21.8784 55.5042 21.8784H95.9039C97.6818 21.8784 99.1231 20.4379 99.1231 18.6609C99.1231 16.8839 97.6818 15.4434 95.9039 15.4434Z" fill="white" />
                    <path d="M95.9039 1.55078H55.5042C53.7263 1.55078 52.2852 2.9913 52.2852 4.76827C52.2852 6.54523 53.7263 7.98574 55.5042 7.98574H95.9039C97.6818 7.98574 99.1231 6.54523 99.1231 4.76827C99.1231 2.9913 97.6818 1.55078 95.9039 1.55078Z" fill="white" />
                    <path d="M95.9039 29.3359H55.5042C53.7263 29.3359 52.2852 30.7765 52.2852 32.5535C52.2852 34.3304 53.7263 35.771 55.5042 35.771H95.9039C97.6818 35.771 99.1231 34.3304 99.1231 32.5535C99.1231 30.7765 97.6818 29.3359 95.9039 29.3359Z" fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_383_1232">
                      <rect width="199.461" height="36.1228" fill="white" />
                    </clipPath>
                  </defs>
                </svg>,
                name: "Joe Stefanelli",
                title: "CTO",
                company: "Delv",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              },
            ]}
          />
        </div>

        {/* faq */}
        <div className="grid grid-cols-2 py-32">
          <h2 className="text-6xl max-w-xl">Frequently Asked Questions</h2>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Product Information</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-dark-foreground">
                <p>
                  Our flagship product combines cutting-edge technology with sleek
                  design. Built with premium materials, it offers unparalleled
                  performance and reliability.
                </p>
                <p>
                  Key features include advanced processing capabilities, and an
                  intuitive user interface designed for both beginners and experts.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Shipping Details</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-dark-foreground">
                <p>
                  We offer worldwide shipping through trusted courier partners.
                  Standard delivery takes 3-5 business days, while express shipping
                  ensures delivery within 1-2 business days.
                </p>
                <p>
                  All orders are carefully packaged and fully insured. Track your
                  shipment in real-time through our dedicated tracking portal.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Return Policy</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-dark-foreground">
                <p>
                  We stand behind our products with a comprehensive 30-day return
                  policy. If you&apos;re not completely satisfied, simply return the
                  item in its original condition.
                </p>
                <p>
                  Our hassle-free return process includes free return shipping and
                  full refunds processed within 48 hours of receiving the returned
                  item.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Return Policy</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-dark-foreground">
                <p>
                  We stand behind our products with a comprehensive 30-day return
                  policy. If you&apos;re not completely satisfied, simply return the
                  item in its original condition.
                </p>
                <p>
                  Our hassle-free return process includes free return shipping and
                  full refunds processed within 48 hours of receiving the returned
                  item.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Return Policy</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-dark-foreground">
                <p>
                  We stand behind our products with a comprehensive 30-day return
                  policy. If you&apos;re not completely satisfied, simply return the
                  item in its original condition.
                </p>
                <p>
                  Our hassle-free return process includes free return shipping and
                  full refunds processed within 48 hours of receiving the returned
                  item.
                </p>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>
      </div>
      <Blog />
      <CallToAction />
      <Footer />
    </>
  );
}
