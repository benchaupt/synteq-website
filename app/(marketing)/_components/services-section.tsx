
export default function ServicesSection() {
  return (
    <section className="max-w-viewport w-full mx-auto px-5 py-32 flex flex-col">
      <div className="flex flex-col gap-10 w-full">
        {/* Header */}
        <div className="flex gap-52 items-end w-full">
          <div className="flex flex-col gap-3 flex-1">
            <p className="font-mono text-sm uppercase tracking-tight text-darker-accent">
              Our Services
            </p>
            <h2 className="text-6xl leading-tight tracking-tighter text-foreground">
              Purpose-built products<br />
              delivered to your workloads
            </h2>
          </div>
          <p className="text-xl text-dark-foreground flex-1 leading-normal tracking-tight max-w-lg">
            From first experiment to multi-node training runs, Synteq and Crunchbits give you a clear path to the right mix of shared cloud, dedicated nodes, and bare metal.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-9 min-h-[630px] w-full">
          {/* Inference Cloud */}
          <div className="bg-background-secondary border border-white/10 flex flex-col justify-between overflow-hidden relative">
            <div className="px-9 pt-9 z-10">
              <h3 className="text-4xl tracking-tight text-white mb-4">
                Inference Cloud
              </h3>
              <p className="text-lg text-dark-foreground tracking-tight leading-normal max-w-md">
                Exercitation reprehenderit esse officia. Consectetur aliqua in irure pariatur et sint consequat occaecat.
              </p>
            </div>
            <div className="w-full flex items-end justify-center">
              <svg viewBox="0 0 529 355" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_558_1445)">
                  <path d="M211.601 0H105.801V105.8H211.601V0Z" fill="url(#paint0_linear_558_1445)" />
                  <path d="M132.251 79.35V26.45L105.801 0V105.8L132.251 79.35Z" fill="url(#paint1_linear_558_1445)" />
                  <path d="M185.151 79.3501H132.251L105.801 105.8H211.601L185.151 79.3501Z" fill="url(#paint2_linear_558_1445)" />
                  <path d="M185.151 26.45H132.251L105.801 0H211.601L185.151 26.45Z" fill="url(#paint3_linear_558_1445)" />
                  <path d="M185.148 79.35V26.45L211.598 0V105.8L185.148 79.35Z" fill="url(#paint4_linear_558_1445)" />
                  <path d="M423.198 0H317.398V105.8H423.198V0Z" fill="url(#paint5_linear_558_1445)" />
                  <path d="M343.848 79.35V26.45L317.398 0V105.8L343.848 79.35Z" fill="url(#paint6_linear_558_1445)" />
                  <path d="M396.748 79.3501H343.848L317.398 105.8H423.198L396.748 79.3501Z" fill="url(#paint7_linear_558_1445)" />
                  <path d="M396.748 26.45H343.848L317.398 0H423.198L396.748 26.45Z" fill="url(#paint8_linear_558_1445)" />
                  <path d="M396.75 79.35V26.45L423.2 0V105.8L396.75 79.35Z" fill="url(#paint9_linear_558_1445)" />
                  <path d="M105.8 105.8H0V211.6H105.8V105.8Z" fill="url(#paint10_linear_558_1445)" />
                  <path d="M26.45 185.15V132.25L0 105.8V211.6L26.45 185.15Z" fill="url(#paint11_linear_558_1445)" />
                  <path d="M79.35 185.15H26.45L0 211.6H105.8L79.35 185.15Z" fill="url(#paint12_linear_558_1445)" />
                  <path d="M79.35 132.25H26.45L0 105.8H105.8L79.35 132.25Z" fill="url(#paint13_linear_558_1445)" />
                  <path d="M79.3516 185.15V132.25L105.802 105.8V211.6L79.3516 185.15Z" fill="url(#paint14_linear_558_1445)" />
                  <path d="M317.402 105.8H211.602V211.6H317.402V105.8Z" fill="url(#paint15_linear_558_1445)" />
                  <path d="M238.052 185.15V132.25L211.602 105.8V211.6L238.052 185.15Z" fill="url(#paint16_linear_558_1445)" />
                  <path d="M290.952 185.15H238.052L211.602 211.6H317.402L290.952 185.15Z" fill="url(#paint17_linear_558_1445)" />
                  <path d="M290.952 132.25H238.052L211.602 105.8H317.402L290.952 132.25Z" fill="url(#paint18_linear_558_1445)" />
                  <path d="M290.949 185.15V132.25L317.399 105.8V211.6L290.949 185.15Z" fill="url(#paint19_linear_558_1445)" />
                  <path d="M528.999 105.8H423.199V211.6H528.999V105.8Z" fill="url(#paint20_linear_558_1445)" />
                  <path d="M449.649 185.15V132.25L423.199 105.8V211.6L449.649 185.15Z" fill="url(#paint21_linear_558_1445)" />
                  <path d="M502.549 185.15H449.649L423.199 211.6H528.999L502.549 185.15Z" fill="url(#paint22_linear_558_1445)" />
                  <path d="M502.549 132.25H449.649L423.199 105.8H528.999L502.549 132.25Z" fill="url(#paint23_linear_558_1445)" />
                  <path d="M502.551 185.15V132.25L529.001 105.8V211.6L502.551 185.15Z" fill="url(#paint24_linear_558_1445)" />
                  <path d="M211.601 211.6H105.801V317.4H211.601V211.6Z" fill="url(#paint25_linear_558_1445)" />
                  <path d="M132.251 290.95V238.05L105.801 211.6V317.4L132.251 290.95Z" fill="url(#paint26_linear_558_1445)" />
                  <path d="M185.151 290.95H132.251L105.801 317.4H211.601L185.151 290.95Z" fill="url(#paint27_linear_558_1445)" />
                  <path d="M185.151 238.05H132.251L105.801 211.6H211.601L185.151 238.05Z" fill="url(#paint28_linear_558_1445)" />
                  <path d="M185.148 290.95V238.05L211.598 211.6V317.4L185.148 290.95Z" fill="url(#paint29_linear_558_1445)" />
                  <path d="M423.198 211.6H317.398V317.4H423.198V211.6Z" fill="url(#paint30_linear_558_1445)" />
                  <path d="M343.848 290.95V238.05L317.398 211.6V317.4L343.848 290.95Z" fill="url(#paint31_linear_558_1445)" />
                  <path d="M396.748 290.95H343.848L317.398 317.4H423.198L396.748 290.95Z" fill="url(#paint32_linear_558_1445)" />
                  <path d="M396.748 238.05H343.848L317.398 211.6H423.198L396.748 238.05Z" fill="url(#paint33_linear_558_1445)" />
                  <path d="M396.75 290.95V238.05L423.2 211.6V317.4L396.75 290.95Z" fill="url(#paint34_linear_558_1445)" />
                  <path d="M105.8 317.4H0V423.2H105.8V317.4Z" fill="url(#paint35_linear_558_1445)" />
                  <path d="M26.45 396.75V343.85L0 317.4V423.2L26.45 396.75Z" fill="url(#paint36_linear_558_1445)" />
                  <path d="M79.35 343.85H26.45L0 317.4H105.8L79.35 343.85Z" fill="url(#paint37_linear_558_1445)" />
                  <path d="M79.3516 396.75V343.85L105.802 317.4V423.2L79.3516 396.75Z" fill="url(#paint38_linear_558_1445)" />
                  <path d="M317.402 317.4H211.602V423.2H317.402V317.4Z" fill="url(#paint39_linear_558_1445)" />
                  <path d="M238.052 396.75V343.85L211.602 317.4V423.2L238.052 396.75Z" fill="url(#paint40_linear_558_1445)" />
                  <path d="M290.952 343.85H238.052L211.602 317.4H317.402L290.952 343.85Z" fill="url(#paint41_linear_558_1445)" />
                  <path d="M290.949 396.75V343.85L317.399 317.4V423.2L290.949 396.75Z" fill="url(#paint42_linear_558_1445)" />
                  <path d="M528.999 317.4H423.199V423.2H528.999V317.4Z" fill="url(#paint43_linear_558_1445)" />
                  <path d="M449.649 396.75V343.85L423.199 317.4V423.2L449.649 396.75Z" fill="url(#paint44_linear_558_1445)" />
                  <path d="M502.549 343.85H449.649L423.199 317.4H528.999L502.549 343.85Z" fill="url(#paint45_linear_558_1445)" />
                  <path d="M502.551 396.75V343.85L529.001 317.4V423.2L502.551 396.75Z" fill="url(#paint46_linear_558_1445)" />
                </g>
                <defs>
                  <linearGradient id="paint0_linear_558_1445" x1="168.62" y1="89.2688" x2="145.476" y2="26.45" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="1" stop-color="#31ECCC" stop-opacity="0.68" />
                  </linearGradient>
                  <linearGradient id="paint1_linear_558_1445" x1="105.801" y1="52.9" x2="138.863" y2="52.9" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint2_linear_558_1445" x1="158.701" y1="109.106" x2="158.701" y2="72.7376" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint3_linear_558_1445" x1="158.701" y1="-3.30625" x2="158.701" y2="33.0625" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint4_linear_558_1445" x1="211.598" y1="52.9" x2="178.536" y2="52.9" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint5_linear_558_1445" x1="380.217" y1="89.2688" x2="357.073" y2="26.45" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="1" stop-color="#31ECCC" stop-opacity="0.68" />
                  </linearGradient>
                  <linearGradient id="paint6_linear_558_1445" x1="317.398" y1="52.9" x2="350.461" y2="52.9" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint7_linear_558_1445" x1="370.298" y1="109.106" x2="370.298" y2="72.7376" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint8_linear_558_1445" x1="370.298" y1="-3.30625" x2="370.298" y2="33.0625" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint9_linear_558_1445" x1="423.2" y1="52.9" x2="390.138" y2="52.9" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint10_linear_558_1445" x1="62.8188" y1="195.069" x2="39.675" y2="132.25" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="1" stop-color="#31ECCC" stop-opacity="0.68" />
                  </linearGradient>
                  <linearGradient id="paint11_linear_558_1445" x1="0" y1="158.7" x2="33.0625" y2="158.7" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint12_linear_558_1445" x1="52.9" y1="214.906" x2="52.9" y2="178.537" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint13_linear_558_1445" x1="52.9" y1="102.494" x2="52.9" y2="138.862" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint14_linear_558_1445" x1="105.802" y1="158.7" x2="72.7391" y2="158.7" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint15_linear_558_1445" x1="274.42" y1="195.069" x2="251.277" y2="132.25" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="1" stop-color="#31ECCC" stop-opacity="0.68" />
                  </linearGradient>
                  <linearGradient id="paint16_linear_558_1445" x1="211.602" y1="158.7" x2="244.664" y2="158.7" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint17_linear_558_1445" x1="264.502" y1="214.906" x2="264.502" y2="178.537" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint18_linear_558_1445" x1="264.502" y1="102.494" x2="264.502" y2="138.862" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint19_linear_558_1445" x1="317.399" y1="158.7" x2="284.337" y2="158.7" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint20_linear_558_1445" x1="486.018" y1="195.069" x2="462.874" y2="132.25" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="1" stop-color="#31ECCC" stop-opacity="0.68" />
                  </linearGradient>
                  <linearGradient id="paint21_linear_558_1445" x1="423.199" y1="158.7" x2="456.262" y2="158.7" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint22_linear_558_1445" x1="476.099" y1="214.906" x2="476.099" y2="178.537" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint23_linear_558_1445" x1="476.099" y1="102.494" x2="476.099" y2="138.862" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint24_linear_558_1445" x1="529.001" y1="158.7" x2="495.938" y2="158.7" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint25_linear_558_1445" x1="168.62" y1="300.869" x2="145.476" y2="238.05" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="1" stop-color="#31ECCC" stop-opacity="0.68" />
                  </linearGradient>
                  <linearGradient id="paint26_linear_558_1445" x1="105.801" y1="264.5" x2="138.863" y2="264.5" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint27_linear_558_1445" x1="158.701" y1="320.706" x2="158.701" y2="284.338" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint28_linear_558_1445" x1="158.701" y1="208.294" x2="158.701" y2="244.663" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint29_linear_558_1445" x1="211.598" y1="264.5" x2="178.536" y2="264.5" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint30_linear_558_1445" x1="380.217" y1="300.869" x2="357.073" y2="238.05" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="1" stop-color="#31ECCC" stop-opacity="0.68" />
                  </linearGradient>
                  <linearGradient id="paint31_linear_558_1445" x1="317.398" y1="264.5" x2="350.461" y2="264.5" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint32_linear_558_1445" x1="370.298" y1="320.706" x2="370.298" y2="284.338" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint33_linear_558_1445" x1="370.298" y1="208.294" x2="370.298" y2="244.663" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint34_linear_558_1445" x1="423.2" y1="264.5" x2="390.138" y2="264.5" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint35_linear_558_1445" x1="62.8188" y1="406.669" x2="39.675" y2="343.85" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="1" stop-color="#31ECCC" stop-opacity="0.68" />
                  </linearGradient>
                  <linearGradient id="paint36_linear_558_1445" x1="0" y1="370.3" x2="33.0625" y2="370.3" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint37_linear_558_1445" x1="52.9" y1="314.094" x2="52.9" y2="350.462" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint38_linear_558_1445" x1="105.802" y1="370.3" x2="72.7391" y2="370.3" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint39_linear_558_1445" x1="274.42" y1="406.669" x2="251.277" y2="343.85" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="1" stop-color="#31ECCC" stop-opacity="0.68" />
                  </linearGradient>
                  <linearGradient id="paint40_linear_558_1445" x1="211.602" y1="370.3" x2="244.664" y2="370.3" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint41_linear_558_1445" x1="264.502" y1="314.094" x2="264.502" y2="350.462" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint42_linear_558_1445" x1="317.399" y1="370.3" x2="284.337" y2="370.3" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint43_linear_558_1445" x1="486.018" y1="406.669" x2="462.874" y2="343.85" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="1" stop-color="#31ECCC" stop-opacity="0.68" />
                  </linearGradient>
                  <linearGradient id="paint44_linear_558_1445" x1="423.199" y1="370.3" x2="456.262" y2="370.3" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint45_linear_558_1445" x1="476.099" y1="314.094" x2="476.099" y2="350.462" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <linearGradient id="paint46_linear_558_1445" x1="529.001" y1="370.3" x2="495.938" y2="370.3" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="0.987399" stop-opacity="0.58" />
                  </linearGradient>
                  <clipPath id="clip0_558_1445">
                    <rect width="529" height="529" fill="white" />
                  </clipPath>
                </defs>
              </svg>

            </div>
          </div>

          {/* GPU Cloud Servers */}
          <div className="bg-background-secondary border border-white/10 flex flex-col justify-between overflow-hidden relative">
            <div className="px-9 pt-9 z-10">
              <h3 className="text-4xl tracking-tight text-white mb-4">
                GPU Cloud Servers
              </h3>
              <p className="text-lg text-dark-foreground tracking-tight leading-normal max-w-md">
                Exercitation reprehenderit esse officia. Consectetur aliqua in irure pariatur et sint consequat occaecat.
              </p>
            </div>
            <div className="w-full flex items-end justify-center">
              <svg width="529" height="348" viewBox="0 0 529 348" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M251.5 1C330.769 1 402.485 17.0675 454.346 42.998C506.267 68.9585 538 104.637 538 143.75C538 182.863 506.267 218.541 454.346 244.502C402.485 270.432 330.769 286.5 251.5 286.5C172.231 286.5 100.515 270.432 48.6543 244.502C-3.26667 218.541 -35 182.863 -35 143.75C-35 104.637 -3.26667 68.9585 48.6543 42.998C100.515 17.0675 172.231 1 251.5 1Z" stroke="url(#paint0_linear_558_1177)" stroke-width="2" />
                <path d="M251.5 16.9727C330.769 16.9727 402.485 33.0402 454.346 58.9707C506.267 84.9312 538 120.61 538 159.723C538 198.835 506.267 234.514 454.346 260.475C402.485 286.405 330.769 302.473 251.5 302.473C172.231 302.473 100.515 286.405 48.6543 260.475C-3.26667 234.514 -35 198.835 -35 159.723C-35 120.61 -3.26667 84.9312 48.6543 58.9707C100.515 33.0402 172.231 16.9727 251.5 16.9727Z" stroke="url(#paint1_linear_558_1177)" stroke-width="2" />
                <path d="M251.5 32.9443C330.769 32.9443 402.485 49.0118 454.346 74.9424C506.267 100.903 538 136.582 538 175.694C538 214.807 506.267 250.486 454.346 276.446C402.485 302.377 330.769 318.444 251.5 318.444C172.231 318.444 100.515 302.377 48.6543 276.446C-3.26667 250.486 -35 214.807 -35 175.694C-35 136.582 -3.26667 100.903 48.6543 74.9424C100.515 49.0118 172.231 32.9443 251.5 32.9443Z" stroke="url(#paint2_linear_558_1177)" stroke-width="2" />
                <path d="M251.5 48.9165C330.769 48.9165 402.485 64.984 454.346 90.9146C506.267 116.875 538 152.554 538 191.667C538 230.779 506.267 266.458 454.346 292.418C402.485 318.349 330.769 334.417 251.5 334.417C172.231 334.417 100.515 318.349 48.6543 292.418C-3.26667 266.458 -35 230.779 -35 191.667C-35 152.554 -3.26667 116.875 48.6543 90.9146C100.515 64.984 172.231 48.9165 251.5 48.9165Z" stroke="url(#paint3_linear_558_1177)" stroke-width="2" />
                <path d="M251.5 64.8892C330.769 64.8892 402.485 80.9567 454.346 106.887C506.267 132.848 538 168.527 538 207.639C538 246.752 506.267 282.431 454.346 308.391C402.485 334.322 330.769 350.389 251.5 350.389C172.231 350.389 100.515 334.322 48.6543 308.391C-3.26667 282.431 -35 246.752 -35 207.639C-35 168.527 -3.26667 132.848 48.6543 106.887C100.515 80.9567 172.231 64.8892 251.5 64.8892Z" stroke="url(#paint4_linear_558_1177)" stroke-width="2" />
                <path d="M251.5 80.8608C330.769 80.8608 402.485 96.9284 454.346 122.859C506.267 148.819 538 184.498 538 223.611C538 262.723 506.267 298.402 454.346 324.363C402.485 350.293 330.769 366.361 251.5 366.361C172.231 366.361 100.515 350.293 48.6543 324.363C-3.26667 298.402 -35 262.723 -35 223.611C-35 184.498 -3.26667 148.819 48.6543 122.859C100.515 96.9284 172.231 80.8608 251.5 80.8608Z" stroke="url(#paint5_linear_558_1177)" stroke-width="2" />
                <path d="M251.5 96.8335C330.769 96.8335 402.485 112.901 454.346 138.832C506.267 164.792 538 200.471 538 239.583C538 278.696 506.267 314.375 454.346 340.335C402.485 366.266 330.769 382.333 251.5 382.333C172.231 382.333 100.515 366.266 48.6543 340.335C-3.26667 314.375 -35 278.696 -35 239.583C-35 200.471 -3.26667 164.792 48.6543 138.832C100.515 112.901 172.231 96.8335 251.5 96.8335Z" stroke="url(#paint6_linear_558_1177)" stroke-width="2" />
                <path d="M251.5 112.806C330.769 112.806 402.485 128.873 454.346 154.804C506.267 180.764 538 216.443 538 255.556C538 294.668 506.267 330.347 454.346 356.308C402.485 382.238 330.769 398.306 251.5 398.306C172.231 398.306 100.515 382.238 48.6543 356.308C-3.26667 330.347 -35 294.668 -35 255.556C-35 216.443 -3.26667 180.764 48.6543 154.804C100.515 128.873 172.231 112.806 251.5 112.806Z" stroke="url(#paint7_linear_558_1177)" stroke-width="2" />
                <path d="M251.5 128.777C330.769 128.777 402.485 144.845 454.346 170.775C506.267 196.736 538 232.415 538 271.527C538 310.64 506.267 346.319 454.346 372.279C402.485 398.21 330.769 414.277 251.5 414.277C172.231 414.277 100.515 398.21 48.6543 372.279C-3.26667 346.319 -35 310.64 -35 271.527C-35 232.415 -3.26667 196.736 48.6543 170.775C100.515 144.845 172.231 128.777 251.5 128.777Z" stroke="url(#paint8_linear_558_1177)" stroke-width="2" />
                <path d="M251.5 144.75C330.769 144.75 402.485 160.818 454.346 186.748C506.267 212.709 538 248.387 538 287.5C538 326.613 506.267 362.291 454.346 388.252C402.485 414.182 330.769 430.25 251.5 430.25C172.231 430.25 100.515 414.182 48.6543 388.252C-3.26667 362.291 -35 326.613 -35 287.5C-35 248.387 -3.26667 212.709 48.6543 186.748C100.515 160.818 172.231 144.75 251.5 144.75Z" stroke="url(#paint9_linear_558_1177)" stroke-width="2" />
                <path d="M251.5 160.723C330.769 160.723 402.485 176.79 454.346 202.721C506.267 228.681 538 264.36 538 303.473C538 342.585 506.267 378.264 454.346 404.225C402.485 430.155 330.769 446.223 251.5 446.223C172.231 446.223 100.515 430.155 48.6543 404.225C-3.26667 378.264 -35 342.585 -35 303.473C-35 264.36 -3.26667 228.681 48.6543 202.721C100.515 176.79 172.231 160.723 251.5 160.723Z" stroke="url(#paint10_linear_558_1177)" stroke-width="2" />
                <path d="M251.5 176.694C330.769 176.694 402.485 192.762 454.346 218.692C506.267 244.653 538 280.332 538 319.444C538 358.557 506.267 394.236 454.346 420.196C402.485 446.127 330.769 462.194 251.5 462.194C172.231 462.194 100.515 446.127 48.6543 420.196C-3.26667 394.236 -35 358.557 -35 319.444C-35 280.332 -3.26667 244.653 48.6543 218.692C100.515 192.762 172.231 176.694 251.5 176.694Z" stroke="url(#paint11_linear_558_1177)" stroke-width="2" />
                <path d="M251.5 192.667C330.769 192.667 402.485 208.734 454.346 234.665C506.267 260.625 538 296.304 538 335.417C538 374.529 506.267 410.208 454.346 436.168C402.485 462.099 330.769 478.167 251.5 478.167C172.231 478.167 100.515 462.099 48.6543 436.168C-3.26667 410.208 -35 374.529 -35 335.417C-35 296.304 -3.26667 260.625 48.6543 234.665C100.515 208.734 172.231 192.667 251.5 192.667Z" stroke="url(#paint12_linear_558_1177)" stroke-width="2" />
                <path d="M251.5 208.639C330.769 208.639 402.485 224.707 454.346 250.637C506.267 276.598 538 312.277 538 351.389C538 390.502 506.267 426.181 454.346 452.141C402.485 478.072 330.769 494.139 251.5 494.139C172.231 494.139 100.515 478.072 48.6543 452.141C-3.26667 426.181 -35 390.502 -35 351.389C-35 312.277 -3.26667 276.598 48.6543 250.637C100.515 224.707 172.231 208.639 251.5 208.639Z" stroke="url(#paint13_linear_558_1177)" stroke-width="2" />
                <path d="M251.5 224.611C330.769 224.611 402.485 240.678 454.346 266.609C506.267 292.569 538 328.248 538 367.361C538 406.473 506.267 442.152 454.346 468.113C402.485 494.043 330.769 510.111 251.5 510.111C172.231 510.111 100.515 494.043 48.6543 468.113C-3.26667 442.152 -35 406.473 -35 367.361C-35 328.248 -3.26667 292.569 48.6543 266.609C100.515 240.678 172.231 224.611 251.5 224.611Z" stroke="url(#paint14_linear_558_1177)" stroke-width="2" />
                <defs>
                  <linearGradient id="paint0_linear_558_1177" x1="251.5" y1="0" x2="251.5" y2="287.5" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="1" stop-color="#14B89F" stop-opacity="0.54" />
                  </linearGradient>
                  <linearGradient id="paint1_linear_558_1177" x1="251.5" y1="15.9727" x2="251.5" y2="303.473" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="1" stop-color="#14B89F" stop-opacity="0.54" />
                  </linearGradient>
                  <linearGradient id="paint2_linear_558_1177" x1="251.5" y1="31.9443" x2="251.5" y2="319.444" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="1" stop-color="#14B89F" stop-opacity="0.54" />
                  </linearGradient>
                  <linearGradient id="paint3_linear_558_1177" x1="251.5" y1="47.9165" x2="251.5" y2="335.417" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="1" stop-color="#14B89F" stop-opacity="0.54" />
                  </linearGradient>
                  <linearGradient id="paint4_linear_558_1177" x1="251.5" y1="63.8892" x2="251.5" y2="351.389" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="1" stop-color="#14B89F" stop-opacity="0.54" />
                  </linearGradient>
                  <linearGradient id="paint5_linear_558_1177" x1="251.5" y1="79.8608" x2="251.5" y2="367.361" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="1" stop-color="#14B89F" stop-opacity="0.54" />
                  </linearGradient>
                  <linearGradient id="paint6_linear_558_1177" x1="251.5" y1="95.8335" x2="251.5" y2="383.333" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="1" stop-color="#14B89F" stop-opacity="0.54" />
                  </linearGradient>
                  <linearGradient id="paint7_linear_558_1177" x1="251.5" y1="111.806" x2="251.5" y2="399.306" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="1" stop-color="#14B89F" stop-opacity="0.54" />
                  </linearGradient>
                  <linearGradient id="paint8_linear_558_1177" x1="251.5" y1="127.777" x2="251.5" y2="415.277" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="1" stop-color="#14B89F" stop-opacity="0.54" />
                  </linearGradient>
                  <linearGradient id="paint9_linear_558_1177" x1="251.5" y1="143.75" x2="251.5" y2="431.25" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="1" stop-color="#14B89F" stop-opacity="0.54" />
                  </linearGradient>
                  <linearGradient id="paint10_linear_558_1177" x1="251.5" y1="159.723" x2="251.5" y2="447.223" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="1" stop-color="#14B89F" stop-opacity="0.54" />
                  </linearGradient>
                  <linearGradient id="paint11_linear_558_1177" x1="251.5" y1="175.694" x2="251.5" y2="463.194" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="1" stop-color="#14B89F" stop-opacity="0.54" />
                  </linearGradient>
                  <linearGradient id="paint12_linear_558_1177" x1="251.5" y1="191.667" x2="251.5" y2="479.167" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="1" stop-color="#14B89F" stop-opacity="0.54" />
                  </linearGradient>
                  <linearGradient id="paint13_linear_558_1177" x1="251.5" y1="207.639" x2="251.5" y2="495.139" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="1" stop-color="#14B89F" stop-opacity="0.54" />
                  </linearGradient>
                  <linearGradient id="paint14_linear_558_1177" x1="251.5" y1="223.611" x2="251.5" y2="511.111" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#31ECCC" />
                    <stop offset="1" stop-color="#14B89F" stop-opacity="0.54" />
                  </linearGradient>
                </defs>
              </svg>

            </div>
          </div>

          {/* Bare Metal Clusters */}
          <div className="bg-background-secondary border border-white/10 flex flex-col justify-between overflow-hidden relative">
            <div className="px-9 pt-9 z-10">
              <h3 className="text-4xl tracking-tight text-white mb-4">
                Bare Metal Clusters
              </h3>
              <p className="text-lg text-dark-foreground tracking-tight leading-normal max-w-md">
                Exercitation reprehenderit esse officia. Consectetur aliqua in irure pariatur et sint consequat occaecat.
              </p>
            </div>
            <div className="w-full flex items-end justify-start">
              <div className="w-full min-h-[350px] relative">
                <svg width="531" height="348" viewBox="0 0 531 348" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask0_558_1196" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="531" height="348">
                    <rect width="530.333" height="347.073" rx="5" fill="white" />
                  </mask>
                  <g mask="url(#mask0_558_1196)">
                    <path d="M2 576.079L374.084 377.619L374.084 4.75519L1.99999 203.215L2 576.079Z" fill="url(#paint0_linear_558_1196)" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M374.084 341.536L374.084 353.563L2 552.023L2 539.995L374.084 341.536ZM374.084 329.508L2 527.968L2 515.94L374.084 317.48L374.084 329.508ZM2 491.884L2 503.912L374.084 305.452L374.084 293.424L2 491.884ZM2 479.856L2 467.828L374.084 269.368L374.084 281.396L2 479.856ZM2 443.773L2 455.8L374.084 257.341L374.084 245.313L2 443.773ZM2 431.745L2 419.717L374.084 221.257L374.084 233.285L2 431.745ZM2 395.661L2 407.689L374.084 209.229L374.084 197.201L2 395.661ZM2 383.633L2 371.605L374.084 173.145L374.084 185.173L2 383.633ZM1.99999 347.55L1.99999 359.577L374.084 161.118L374.084 149.09L1.99999 347.55ZM1.99999 335.522L1.99999 323.494L374.084 125.034L374.084 137.062L1.99999 335.522ZM1.99999 299.438L1.99999 311.466L374.084 113.006L374.084 100.978L1.99999 299.438ZM1.99999 287.41L1.99999 275.382L374.084 76.9224L374.084 88.9503L1.99999 287.41ZM1.99999 251.327L1.99999 263.354L374.084 64.8946L374.084 52.8667L1.99999 251.327ZM1.99999 239.299L1.99999 227.271L374.084 28.8109L374.084 40.8388L1.99999 239.299ZM1.99999 203.215L1.99999 215.243L374.084 16.7831L374.084 4.75519L1.99999 203.215ZM374.084 377.619L374.084 365.591L2 564.051L2 576.079L374.084 377.619Z" fill="url(#paint1_linear_558_1196)" />
                    <path d="M374.082 377.617L746.166 576.076L746.166 203.212L374.082 4.75275L374.082 377.617Z" fill="url(#paint2_linear_558_1196)" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M746.166 539.993L746.166 552.021L374.082 353.561L374.082 341.533L746.166 539.993ZM746.166 527.965L374.082 329.505L374.082 317.477L746.166 515.937L746.166 527.965ZM374.082 293.422L374.082 305.45L746.166 503.909L746.166 491.881L374.082 293.422ZM374.082 281.394L374.082 269.366L746.166 467.826L746.166 479.853L374.082 281.394ZM374.082 245.31L374.082 257.338L746.166 455.798L746.166 443.77L374.082 245.31ZM374.082 233.282L374.082 221.254L746.166 419.714L746.166 431.742L374.082 233.282ZM374.082 197.199L374.082 209.227L746.166 407.686L746.166 395.658L374.082 197.199ZM374.082 185.171L374.082 173.143L746.166 371.603L746.166 383.631L374.082 185.171ZM374.082 149.087L374.082 161.115L746.166 359.575L746.166 347.547L374.082 149.087ZM374.082 137.059L374.082 125.031L746.166 323.491L746.166 335.519L374.082 137.059ZM374.082 100.976L374.082 113.004L746.166 311.463L746.166 299.435L374.082 100.976ZM374.082 88.9478L374.082 76.92L746.166 275.38L746.166 287.408L374.082 88.9478ZM374.082 52.8642L374.082 64.8921L746.166 263.352L746.166 251.324L374.082 52.8642ZM374.082 40.8364L374.082 28.8085L746.166 227.268L746.166 239.296L374.082 40.8364ZM374.082 4.75275L374.082 16.7806L746.166 215.24L746.166 203.212L374.082 4.75275ZM746.166 576.076L746.166 564.049L374.082 365.589L374.082 377.617L746.166 576.076Z" fill="url(#paint3_linear_558_1196)" />
                    <path d="M2 203.213L374.084 401.673L374.084 774.537L1.99999 576.077L2 203.213Z" fill="url(#paint4_linear_558_1196)" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M374.084 437.756L374.084 425.728L2 227.269L2 239.297L374.084 437.756ZM374.084 449.784L2 251.324L2 263.352L374.084 461.812L374.084 449.784ZM2 287.408L2 275.38L374.084 473.84L374.084 485.868L2 287.408ZM2 299.436L2 311.464L374.084 509.924L374.084 497.896L2 299.436ZM2 335.52L2 323.492L374.084 521.951L374.084 533.979L2 335.52ZM2 347.547L2 359.575L374.084 558.035L374.084 546.007L2 347.547ZM2 383.631L2 371.603L374.084 570.063L374.084 582.091L2 383.631ZM2 395.659L2 407.687L374.084 606.147L374.084 594.119L2 395.659ZM1.99999 431.742L1.99999 419.715L374.084 618.174L374.084 630.202L1.99999 431.742ZM1.99999 443.77L1.99999 455.798L374.084 654.258L374.084 642.23L1.99999 443.77ZM1.99999 479.854L1.99999 467.826L374.084 666.286L374.084 678.314L1.99999 479.854ZM1.99999 491.882L1.99999 503.91L374.084 702.37L374.084 690.342L1.99999 491.882ZM1.99999 527.965L1.99999 515.938L374.084 714.397L374.084 726.425L1.99999 527.965ZM1.99999 539.993L1.99999 552.021L374.084 750.481L374.084 738.453L1.99999 539.993ZM1.99999 576.077L1.99999 564.049L374.084 762.509L374.084 774.537L1.99999 576.077ZM374.084 401.673L374.084 413.701L2 215.241L2 203.213L374.084 401.673Z" fill="url(#paint5_linear_558_1196)" />
                    <path d="M374.082 401.673L746.166 203.213L746.166 576.077L374.082 774.537L374.082 401.673Z" fill="url(#paint6_linear_558_1196)" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M746.166 239.297L746.166 227.269L374.082 425.729L374.082 437.756L746.166 239.297ZM746.166 251.325L374.082 449.784L374.082 461.812L746.166 263.352L746.166 251.325ZM374.082 485.868L374.082 473.84L746.166 275.38L746.166 287.408L374.082 485.868ZM374.082 497.896L374.082 509.924L746.166 311.464L746.166 299.436L374.082 497.896ZM374.082 533.979L374.082 521.951L746.166 323.492L746.166 335.52L374.082 533.979ZM374.082 546.007L374.082 558.035L746.166 359.575L746.166 347.548L374.082 546.007ZM374.082 582.091L374.082 570.063L746.166 371.603L746.166 383.631L374.082 582.091ZM374.082 594.119L374.082 606.147L746.166 407.687L746.166 395.659L374.082 594.119ZM374.082 630.202L374.082 618.174L746.166 419.715L746.166 431.743L374.082 630.202ZM374.082 642.23L374.082 654.258L746.166 455.798L746.166 443.771L374.082 642.23ZM374.082 678.314L374.082 666.286L746.166 467.826L746.166 479.854L374.082 678.314ZM374.082 690.342L374.082 702.37L746.166 503.91L746.166 491.882L374.082 690.342ZM374.082 726.425L374.082 714.397L746.166 515.938L746.166 527.966L374.082 726.425ZM374.082 738.453L374.082 750.481L746.166 552.021L746.166 539.994L374.082 738.453ZM374.082 774.537L374.082 762.509L746.166 564.049L746.166 576.077L374.082 774.537ZM746.166 203.213L746.166 215.241L374.082 413.701L374.082 401.673L746.166 203.213Z" fill="url(#paint7_linear_558_1196)" />
                  </g>
                  <defs>
                    <linearGradient id="paint0_linear_558_1196" x1="188.042" y1="477.123" x2="33.2243" y2="186.059" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#14B89F" />
                      <stop offset="1" stop-color="#1B7668" stop-opacity="0" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_558_1196" x1="312.07" y1="464.821" x2="0.232067" y2="132.476" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#181818" />
                      <stop offset="1" stop-color="#181818" stop-opacity="0" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_558_1196" x1="406.721" y1="395.658" x2="589.495" y2="146.082" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#31ECCC" />
                      <stop offset="1" stop-color="white" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_558_1196" x1="380.61" y1="404.679" x2="688.205" y2="148.758" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#31ECCC" />
                      <stop offset="1" stop-color="#15171B" />
                    </linearGradient>
                    <linearGradient id="paint4_linear_558_1196" x1="87.4787" y1="241.005" x2="-20.3654" y2="710.892" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#1B3332" />
                      <stop offset="1" stop-color="#5F5F5F" />
                    </linearGradient>
                    <linearGradient id="paint5_linear_558_1196" x1="92.5068" y1="259.534" x2="-14.2008" y2="614.842" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#31ECCC" />
                      <stop offset="1" stop-color="#181818" />
                    </linearGradient>
                    <linearGradient id="paint6_linear_558_1196" x1="434.42" y1="393.872" x2="736.408" y2="464.538" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#131B29" />
                      <stop offset="1" stop-color="#4E4E4E" />
                    </linearGradient>
                    <linearGradient id="paint7_linear_558_1196" x1="414.307" y1="407.769" x2="823.459" y2="440.348" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#31ECCC" stop-opacity="0" />
                      <stop offset="1" stop-color="#31ECCC" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
