import { getPayload } from "payload";
import config from "@/payload.config";
import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join, extname } from "path";

// ─── Lexical helpers ───────────────────────────────────────────────

function t(content: string, format = 0) {
  return {
    mode: "normal" as const,
    text: content,
    type: "text" as const,
    style: "",
    detail: 0,
    format,
    version: 1,
  };
}

function p(...children: ReturnType<typeof t>[]) {
  return {
    type: "paragraph" as const,
    format: "" as const,
    indent: 0,
    version: 1,
    children: children.length ? children : [t("")],
    direction: "ltr" as const,
    textFormat: 0,
    textStyle: "",
  };
}

function h2(...children: ReturnType<typeof t>[]) {
  return {
    type: "heading" as const,
    tag: "h2" as const,
    format: "" as const,
    indent: 0,
    version: 1,
    children,
    direction: "ltr" as const,
    textFormat: 0,
    textStyle: "",
  };
}

function h3(...children: ReturnType<typeof t>[]) {
  return {
    type: "heading" as const,
    tag: "h3" as const,
    format: "" as const,
    indent: 0,
    version: 1,
    children,
    direction: "ltr" as const,
    textFormat: 0,
    textStyle: "",
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function li(...children: any[]) {
  return {
    type: "listitem" as const,
    format: "" as const,
    indent: 0,
    version: 1,
    value: 1,
    children,
    direction: "ltr" as const,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ul(...items: any[]) {
  return {
    type: "list" as const,
    listType: "bullet" as const,
    tag: "ul" as const,
    start: 1,
    format: "" as const,
    indent: 0,
    version: 1,
    children: items.map((item, i) => ({ ...item, value: i + 1 })),
    direction: "ltr" as const,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ol(...items: any[]) {
  return {
    type: "list" as const,
    listType: "number" as const,
    tag: "ol" as const,
    start: 1,
    format: "" as const,
    indent: 0,
    version: 1,
    children: items.map((item, i) => ({ ...item, value: i + 1 })),
    direction: "ltr" as const,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function tableCell(headerState: number, ...children: any[]) {
  return {
    type: "tablecell" as const,
    version: 1,
    headerState,
    colSpan: 1,
    rowSpan: 1,
    width: undefined,
    backgroundColor: undefined,
    children: children.length ? children : [p(t(""))],
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function tableRow(...cells: any[]) {
  return { type: "tablerow" as const, version: 1, children: cells };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function tableNode(...rows: any[]) {
  return { type: "table" as const, version: 1, children: rows };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function richText(...children: any[]) {
  return {
    root: {
      type: "root",
      format: "" as const,
      indent: 0,
      version: 1,
      children,
      direction: "ltr" as const,
    },
  };
}

// ─── Categories ────────────────────────────────────────────────────

const categories = [
  "Mining Guides",
  "Market Updates",
  "Industry Insights",
  "Hardware",
  "Operations",
];

// ─── Blog Posts ────────────────────────────────────────────────────

const blogPosts = [
  {
    title: "How to Start Mining Bitcoin",
    excerpt:
      "A comprehensive beginner's guide to Bitcoin mining — from choosing the right hardware to joining a mining pool and optimizing your operation for profitability.",
    author: "Lexie Leighton",
    tags: [{ tag: "Bitcoin" }, { tag: "Mining" }, { tag: "Beginner Guide" }],
    categoryTitle: "Mining Guides",
    publishedAt: "2024-02-21T12:00:00.000Z",
    content: richText(
      p(
        t(
          "Bitcoin mining is an important process that supports the Bitcoin network by verifying and recording transactions on the blockchain. As a miner, you can contribute to the network and earn Bitcoin rewards in exchange for your computing power."
        )
      ),
      h2(t("Understanding Mining Hardware")),
      p(
        t(
          "Today, the difficulty to mine Bitcoin has increased so dramatically that only extremely powerful ASICs (Application-Specific Integrated Circuits) can mine Bitcoin profitably. These specialized machines perform trillions of calculations per second, far outpacing any general-purpose CPU or GPU. When selecting hardware, the three key metrics to evaluate are hashrate, power consumption, and overall profitability potential."
        )
      ),
      p(
        t(
          "Leading manufacturers like Bitmain and MicroBT produce the most efficient ASICs on the market. Bitmain's latest Antminer S23 series promises sub-10 J/TH efficiency, while MicroBT's Whatsminer M60 delivers competitive performance in immersion-cooled form factors."
        )
      ),
      h2(t("Setting Up Your Mining Operation")),
      p(
        t(
          "After acquiring your hardware, you'll need a suitable facility. Residential electricity rates are generally too expensive for profitable mining operations. Most serious miners partner with data center providers or colocation facilities that offer competitive power rates, proper cooling infrastructure, and reliable uptime."
        )
      ),
      p(
        t(
          "Mining equipment generates substantial heat and consumes significant electricity. Proper cooling — whether air-cooled or immersion-cooled — is critical to maintaining hardware longevity and operational efficiency."
        )
      ),
      h2(t("Joining a Mining Pool")),
      p(
        t(
          "Mining pools combine the computational efforts of multiple miners to improve the chances of earning rewards. Pools typically charge fees and distribute rewards based on the amount of computing power contributed. For most operators, joining a pool provides more consistent, predictable revenue compared to solo mining."
        )
      ),
      h2(t("Monitoring and Optimization")),
      p(
        t(
          "Once operational, miners should continuously monitor their hashrate, electricity usage, and system performance. Online dashboards and monitoring tools help track key metrics. Optimization involves adjusting power settings, fine-tuning mining software, and ensuring environmental conditions remain within optimal ranges."
        )
      ),
      p(
        t(
          "For personalized guidance on starting a mining operation, Synteq Digital's consulting team offers end-to-end support — from hardware procurement to facility selection and ongoing optimization."
        )
      )
    ),
  },
  {
    title: "Navigating a Post-Halving Market",
    excerpt:
      "Insights from Synteq Digital CEO Taras Kulyk on market trends following Bitcoin's April 2024 halving — consolidation, logistics challenges, and strategic positioning.",
    author: "Lexie Leighton",
    tags: [
      { tag: "Bitcoin" },
      { tag: "Halving" },
      { tag: "Market Analysis" },
    ],
    categoryTitle: "Industry Insights",
    publishedAt: "2024-06-13T12:00:00.000Z",
    content: richText(
      p(
        t(
          "In a recent appearance on The Mining Pod podcast, Synteq Digital Founder and CEO Taras Kulyk shared his perspective on the evolving digital mining landscape following Bitcoin's April 2024 halving event. Here are the key takeaways for operators and investors navigating this new market reality."
        )
      ),
      h2(t("Industry Consolidation Accelerates")),
      p(
        t(
          "Consolidation talks among publicly listed miners have only elevated, as both friendly and hostile bids are taking shape in real time. This M&A activity highlights service sector gaps within the mining industry that well-positioned companies can fill."
        )
      ),
      p(
        t(
          "Well-capitalized service providers are positioned to fill these gaps by offering comprehensive solutions to commercial and institutional partners. As operations scale and margins compress post-halving, the value of integrated service platforms becomes increasingly apparent."
        )
      ),
      h2(t("Logistics and Supply Chain Challenges")),
      p(
        t(
          "Geopolitical tensions continue to affect system and component transfers across borders. Lower-efficiency hardware is migrating from North America to regions with cheaper, stranded energy sources. This global rebalancing of hashrate creates both logistical challenges and opportunities for service providers with international networks."
        )
      ),
      h2(t("Regional Risk Factors")),
      p(
        t(
          'While some jurisdictions offer compelling cost advantages, Kulyk cautions that "winds of change blow pretty easily" in certain political climates. Operators must weigh the short-term cost benefits against long-term operational stability risks when selecting deployment locations.'
        )
      ),
      h2(t("Strategic Positioning")),
      p(
        t(
          'For both newcomers and industry veterans, the advice is clear: "Align with partners who remain visible, referrable, and who remain steadfast in executing on commitments to their clients." In a post-halving environment where margins are tighter, the quality of your partnerships becomes a competitive advantage.'
        )
      )
    ),
  },
  {
    title:
      "June 2025 Digital Asset & HPC Infrastructure Market Update",
    excerpt:
      "One year after the April 2024 halving, a comprehensive look at hashrate growth, next-gen ASICs, GPU export controls, heat reuse innovations, and the 2026 outlook.",
    author: "Lexie Leighton",
    tags: [
      { tag: "Market Update" },
      { tag: "HPC" },
      { tag: "ASICs" },
      { tag: "GPUs" },
    ],
    categoryTitle: "Market Updates",
    publishedAt: "2025-06-25T12:00:00.000Z",
    content: richText(
      p(
        t(
          "One year following the April 2024 halving event, digital asset mining economics remain in constant flux. Larger data center operators are rapidly adjusting to market changes. Global hashrate is approaching 1 zetahash, and Bitmain unveiled the S23 series at WDMS in May, promising sub-10 J/TH efficiency — the industry's first \"petahash class\" ASIC."
        )
      ),
      h2(t("Bitcoin Mining Metrics: Year-over-Year")),
      p(
        t(
          "Network hashrate has surged from approximately 630 EH/s in May 2024 to around 930 EH/s — a 47% year-over-year increase. Public miner share has declined slightly from 34% to 30%, while hashprice has compressed from $120/PH/day to approximately $52/PH/day, a 57% decrease."
        )
      ),
      p(
        t(
          "Public mining companies like Marathon, Riot Platforms, and CleanSpark continue expanding capacity despite tightening margins. Hardware refreshes are accelerating as S19 fleets are replaced by S21 and S23 models."
        )
      ),
      h2(t("Next-Generation ASICs")),
      p(
        t(
          "Bitmain's S23 U3v delivers 1 PH/s at roughly 8.9 J/TH in a 3U rack form factor, with availability expected in Q1 2026. MicroBT's M60 offers 780 TH/s at approximately 15 J/TH for immersion deployments in H2 2025. Single-digit joules-per-terahash efficiency represents chip-level improvement plateaus, but higher power densities and improved thermal management enable better datacenter integration."
        )
      ),
      p(
        t(
          "Wafer allocation at TSMC and Samsung remains constrained. ASIC manufacturers compete for sub-5nm foundry capacity alongside AI hardware, mobile, and consumer electronics — a constraint likely moderating hashrate expansion through 2026."
        )
      ),
      h2(t("Heat Capture & Secondary Hardware Applications")),
      p(
        t(
          "S19-class equipment is finding renewed utility. Canadian and Northern European operators install containerized miners to heat greenhouses, desiccate wood, and pilot community swimming pool heating projects in Nordic municipalities. As carbon credit markets mature and pilot economics validate, BTU utilization is expected to become a formal revenue stream alongside Bitcoin generation."
        )
      ),
      h2(t("HPC, GPUs & Export Controls")),
      p(
        t(
          "Under U.S. Export Administration Regulations Section 5.1, sub-5nm AI GPU shipments to China, Russia, Iran, and embargoed destinations require approval. An expanding \"yellow list\" of transshipment hubs — including Turkey, Saudi Arabia, and Singapore — triggers enhanced licensing reviews, creating delays even for allied markets."
        )
      ),
      p(
        t(
          "These dynamics produce unusual market fluctuations in GPU supply and pricing, with spot pricing variances exceeding 10–20% and delivery delays ranging from 4–16 weeks for large quantities. Governments and enterprise customers are prioritizing building in-country AI clusters for data residency and domestic hardware security."
        )
      ),
      h2(t("2026 Outlook")),
      p(
        t(
          "Hashrate trajectory points toward 1.2–1.3 ZH by mid-2026, constrained by wafer availability. Hashprice is recovering above $50/PH/day from April lows below $40. New hardware releases from major manufacturers usher in the sub-10 J/TH efficiency era. AI/HPC colocation deals provide margin support for miners, while stricter GPU export rules and heat reuse projects scale from niche to mainstream."
        )
      )
    ),
  },
  {
    title:
      "Understanding ASIC Efficiency: What J/TH Means for Your Bottom Line",
    excerpt:
      "Breaking down the joules-per-terahash metric — how it impacts operational costs, ROI timelines, and fleet upgrade decisions for digital mining operators.",
    author: "Synteq Digital",
    tags: [
      { tag: "ASICs" },
      { tag: "Efficiency" },
      { tag: "Hardware" },
    ],
    categoryTitle: "Hardware",
    publishedAt: "2025-03-10T12:00:00.000Z",
    content: richText(
      p(
        t(
          "When evaluating ASIC mining hardware, the single most important metric beyond sticker price is energy efficiency — measured in joules per terahash (J/TH). This figure directly determines your ongoing operational costs and, ultimately, your profitability."
        )
      ),
      h2(t("What Is J/TH?")),
      p(
        t(
          "Joules per terahash measures how much energy a mining machine consumes to produce one terahash of computational power. Lower J/TH means greater efficiency — the machine produces more hashrate per unit of electricity consumed. For example, Bitmain's S21 at approximately 17.5 J/TH is significantly more efficient than the older S19 series at 30+ J/TH."
        )
      ),
      h2(t("Impact on Operating Economics")),
      p(
        t(
          "At scale, even small differences in J/TH translate to meaningful cost savings. Consider a 100 MW deployment: upgrading from 30 J/TH machines to 17 J/TH units nearly doubles your hashrate output for the same power draw. Alternatively, you can achieve the same hashrate in roughly half the rack space and power, freeing capacity for expansion or colocation revenue."
        )
      ),
      p(
        t(
          "The relationship between J/TH and electricity cost is straightforward. At $0.04/kWh, a 30 J/TH machine costs roughly $0.035 per TH/day in electricity. A 17 J/TH machine drops that to $0.020/TH/day. Over a fleet of thousands of units running 24/7, these savings compound rapidly."
        )
      ),
      h2(t("Fleet Upgrade Decision Framework")),
      p(
        t(
          "When evaluating whether to upgrade your fleet, consider three key factors: the efficiency delta between current and new hardware, your all-in electricity cost, and the current hashprice environment. As a general rule, when the efficiency improvement exceeds 40% and hardware payback periods fall below 12 months at prevailing hashprice, upgrades make economic sense."
        )
      ),
      h2(t("The Road to Sub-10 J/TH")),
      p(
        t(
          "The industry is approaching a pivotal threshold. Bitmain's S23 series promises sub-10 J/TH efficiency, representing the next major step function in mining economics. Operators who position themselves for these next-generation machines — securing allocation, preparing infrastructure for higher power densities — will have a meaningful competitive advantage in the 2026–2027 cycle."
        )
      )
    ),
  },
  {
    title: "The Business Case for Fleet Refresh Services",
    excerpt:
      "Why leading mining operators are turning to fleet refresh programs to extend hardware lifecycles, recover residual value, and maintain operational readiness.",
    author: "Synteq Digital",
    tags: [
      { tag: "Fleet Refresh" },
      { tag: "Repair" },
      { tag: "Operations" },
    ],
    categoryTitle: "Operations",
    publishedAt: "2025-09-15T12:00:00.000Z",
    content: richText(
      p(
        t(
          "As digital mining fleets age and newer, more efficient hardware enters the market, operators face a critical decision: retire aging machines entirely or invest in fleet refresh programs that extend hardware lifecycles and recover residual value. Increasingly, the data supports the latter."
        )
      ),
      h2(t("What Is a Fleet Refresh?")),
      p(
        t(
          "A fleet refresh is a comprehensive service that includes testing, diagnostics, cleaning, consolidation, repair, and — when appropriate — asset liquidation. Rather than treating hardware as disposable, fleet refresh programs take a lifecycle management approach that maximizes the total return on your hardware investment."
        )
      ),
      h2(t("The Economics of Refresh vs. Replace")),
      p(
        t(
          "New next-generation ASICs carry significant upfront costs, long lead times, and allocation constraints. Meanwhile, properly maintained and refreshed hardware can continue generating revenue at sites with low electricity costs. S19-class machines refreshed and deployed at sub-$0.03/kWh sites can remain profitable even at compressed hashprices."
        )
      ),
      p(
        t(
          "Additionally, international demand for older-generation hardware remains strong. Markets in Africa, Central Asia, and South America actively seek refurbished equipment for stranded energy deployments. A well-managed fleet refresh program can recover 20–40% of original hardware value through international resale channels."
        )
      ),
      h2(t("Synteq's Approach")),
      p(
        t(
          "Following the acquisition of HMTech's operations, Synteq Digital offers a vertically integrated fleet refresh service. Our technicians hold certifications across Bitmain, MicroBT, Canaan, and Auradine platforms. With two US-based facilities, we provide onshore repair and maintenance at scale — one of the only providers built to support multi-manufacturer fleets."
        )
      ),
      h2(t("Getting Started")),
      p(
        t(
          "Whether you're managing a fleet of 500 or 50,000 ASICs, a fleet refresh assessment can help you understand the current state of your hardware, identify units worth repairing, and develop a disposition strategy for end-of-life equipment. Contact our team to schedule an assessment."
        )
      )
    ),
  },
  {
    title:
      "Data Center Site Selection: Key Factors for Mining Operations",
    excerpt:
      "A practical guide to evaluating data center locations — covering power costs, cooling, connectivity, regulatory environment, and long-term scalability.",
    author: "Synteq Digital",
    tags: [
      { tag: "Data Centers" },
      { tag: "Site Selection" },
      { tag: "Infrastructure" },
    ],
    categoryTitle: "Operations",
    publishedAt: "2025-11-20T12:00:00.000Z",
    content: richText(
      p(
        t(
          "Selecting the right data center location is one of the most consequential decisions for any mining operation. Power cost, cooling efficiency, connectivity, regulatory environment, and scalability potential all factor into long-term profitability. Here's what operators should evaluate."
        )
      ),
      h2(t("Power: The Primary Variable")),
      p(
        t(
          "Electricity typically represents 60–80% of operating expenses for a mining facility. The difference between $0.03/kWh and $0.05/kWh across a 50 MW deployment translates to roughly $8.7 million annually. Operators should evaluate not just current rates, but the stability and trajectory of power costs — including exposure to demand charges, seasonal pricing, and regulatory changes."
        )
      ),
      p(
        t(
          "Increasingly, operators are co-locating with stranded or curtailed energy sources: natural gas flares, behind-the-meter hydro, and even landfill gas. These arrangements offer sub-$0.03/kWh rates but often require more complex infrastructure and permitting."
        )
      ),
      h2(t("Cooling and Climate Considerations")),
      p(
        t(
          "Ambient temperature directly impacts cooling costs and equipment longevity. Northern climates offer natural advantages for air-cooled deployments, while hot and humid environments may require immersion cooling or supplemental mechanical cooling — adding to both capital and operating expenditures."
        )
      ),
      h2(t("Connectivity and Network Infrastructure")),
      p(
        t(
          "While mining is less latency-sensitive than financial trading, reliable network connectivity remains essential for pool communication, monitoring, and remote management. Sites should have redundant fiber paths and sufficient bandwidth for fleet-level telemetry."
        )
      ),
      h2(t("Regulatory and Political Stability")),
      p(
        t(
          "Jurisdiction matters. Operators should evaluate the regulatory posture toward digital assets, noise ordinances, environmental permitting requirements, and the overall political stability of the region. As we've seen in multiple markets, favorable conditions can change quickly."
        )
      ),
      h2(t("Synteq's Data Center Network")),
      p(
        t(
          "Synteq Digital operates and partners with data center facilities across the United States and Canada, including locations in Texas, Pennsylvania, New York, Washington, and North Carolina. Our Crunchbits HPC division maintains seven active data centers with 99.99% uptime SLAs. Contact our team to explore hosting and colocation options."
        )
      )
    ),
  },
  // ── Posts originally from blog-content-drafts.md (proper Lexical) ──
  {
    title: "The Rise of GPU Cloud Computing: Why Businesses Are Making the Switch",
    excerpt:
      "Discover why businesses are rapidly adopting GPU cloud computing for AI workloads, and how it's transforming the way companies approach machine learning infrastructure.",
    author: "Synteq Digital",
    tags: [{ tag: "GPU" }, { tag: "Cloud Computing" }, { tag: "AI Infrastructure" }],
    categoryTitle: "Industry Insights",
    publishedAt: "2025-01-15T12:00:00.000Z",
    heroImageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
    content: richText(
      p(t("The landscape of cloud computing has undergone a seismic shift. As artificial intelligence and machine learning workloads become central to business operations, traditional CPU-based infrastructure is no longer sufficient. GPU cloud computing has emerged as the backbone of modern AI development.")),
      h3(t("Why GPUs Matter for AI")),
      p(t("Graphics Processing Units excel at parallel processing — the ability to perform thousands of calculations simultaneously. While CPUs handle tasks sequentially, GPUs can process multiple data points at once, making them ideal for:")),
      ul(
        li(t("Training large language models")),
        li(t("Running inference at scale")),
        li(t("Processing real-time video and image analysis")),
        li(t("Accelerating scientific simulations")),
      ),
      h3(t("The Economics of GPU Cloud")),
      p(t("Building an on-premise GPU cluster requires significant capital expenditure. A single NVIDIA H100 GPU can cost upwards of $30,000, and that's before considering cooling, power, and maintenance costs. GPU cloud services allow businesses to:")),
      ul(
        li(t("Pay only for compute time used")),
        li(t("Scale instantly based on demand")),
        li(t("Access the latest hardware without procurement delays")),
        li(t("Reduce operational overhead")),
      ),
      h3(t("Making the Transition")),
      p(t("Organizations considering GPU cloud adoption should evaluate their workload patterns, data security requirements, and integration needs. The most successful migrations start with a hybrid approach — running development workloads in the cloud while keeping sensitive production systems on-premise until trust is established.")),
      p(t("The future of computing is parallel, and GPU cloud infrastructure is leading the way.")),
    ),
  },
  {
    title: "Bare Metal vs Virtual Machines: Choosing the Right Infrastructure for AI Workloads",
    excerpt:
      "Compare bare metal servers and virtual machines for AI workloads. Learn when each option makes sense and how to optimize your infrastructure decisions.",
    author: "Synteq Digital",
    tags: [{ tag: "Bare Metal" }, { tag: "Virtual Machines" }, { tag: "Infrastructure" }],
    categoryTitle: "Hardware",
    publishedAt: "2025-04-20T12:00:00.000Z",
    heroImageUrl: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=1200&q=80",
    content: richText(
      p(t("When deploying AI applications, one of the first architectural decisions is whether to use bare metal servers or virtual machines. Each approach has distinct advantages, and the right choice depends on your specific requirements.")),
      h3(t("Understanding Bare Metal")),
      p(t("Bare metal servers provide direct access to physical hardware without a hypervisor layer. This means:")),
      ul(
        li(t("Zero virtualization overhead")),
        li(t("Full control over hardware resources")),
        li(t("Consistent, predictable performance")),
        li(t("Direct GPU access without passthrough complexity")),
      ),
      p(t("For AI training workloads that push hardware to its limits, bare metal often provides 10-15% better performance compared to virtualized environments.")),
      h3(t("The Case for Virtual Machines")),
      p(t("Virtual machines offer flexibility that bare metal cannot match:")),
      ul(
        li(t("Rapid provisioning and scaling")),
        li(t("Easy snapshotting and backup")),
        li(t("Better resource utilization across teams")),
        li(t("Simplified disaster recovery")),
      ),
      p(t("For inference workloads with variable demand, VMs allow you to right-size resources dynamically.")),
      h3(t("Comparison at a Glance")),
      tableNode(
        tableRow(
          tableCell(1, p(t("Factor", 1))),
          tableCell(1, p(t("Bare Metal", 1))),
          tableCell(1, p(t("Virtual Machines", 1))),
        ),
        tableRow(
          tableCell(0, p(t("Performance"))),
          tableCell(0, p(t("10-15% higher for training"))),
          tableCell(0, p(t("Good for variable inference"))),
        ),
        tableRow(
          tableCell(0, p(t("Flexibility"))),
          tableCell(0, p(t("Fixed resource allocation"))),
          tableCell(0, p(t("Dynamic scaling on demand"))),
        ),
        tableRow(
          tableCell(0, p(t("GPU Access"))),
          tableCell(0, p(t("Direct, zero overhead"))),
          tableCell(0, p(t("Passthrough complexity"))),
        ),
        tableRow(
          tableCell(0, p(t("Cost Model"))),
          tableCell(0, p(t("Higher utilization, less flexible"))),
          tableCell(0, p(t("Pay for what you use"))),
        ),
        tableRow(
          tableCell(0, p(t("Best For"))),
          tableCell(0, p(t("Training clusters, production inference"))),
          tableCell(0, p(t("Dev environments, variable workloads"))),
        ),
      ),
      h3(t("Hybrid Approaches")),
      p(t("Many organizations adopt a hybrid strategy:")),
      ol(
        li(t("Training clusters", 1), t(" run on bare metal for maximum performance")),
        li(t("Development environments", 1), t(" use VMs for flexibility")),
        li(t("Production inference", 1), t(" leverages containers on bare metal for the best of both worlds")),
      ),
      h3(t("Key Considerations")),
      p(t("When making your decision, evaluate:")),
      ul(
        li(t("Workload intensity: ", 1), t("Training benefits from bare metal; inference may not")),
        li(t("Multi-tenancy needs: ", 1), t("VMs provide better isolation")),
        li(t("Budget constraints: ", 1), t("Bare metal has higher utilization but less flexibility")),
        li(t("Team expertise: ", 1), t("VMs have a gentler learning curve")),
      ),
      p(t("The optimal infrastructure often combines both approaches, matching each workload to its ideal environment.")),
    ),
  },
  {
    title: "5 Strategies to Reduce Your AI Inference Costs by 60%",
    excerpt:
      "Learn proven strategies to dramatically reduce AI inference costs without sacrificing performance. From model optimization to smart infrastructure choices.",
    author: "Synteq Digital",
    tags: [{ tag: "Cost Optimization" }, { tag: "AI Inference" }, { tag: "Infrastructure" }],
    categoryTitle: "Operations",
    publishedAt: "2025-07-08T12:00:00.000Z",
    heroImageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    content: richText(
      p(t("AI inference costs can quickly spiral out of control as applications scale. Many organizations find that inference — running trained models in production — accounts for 90% of their total AI compute spend. Here are five strategies to significantly reduce these costs.")),
      h3(t("1. Model Quantization")),
      p(t("Quantization reduces model precision from 32-bit floating point to 8-bit integers or lower. This technique can:")),
      ul(
        li(t("Reduce model size by 4x")),
        li(t("Improve inference speed by 2-4x")),
        li(t("Lower memory requirements significantly")),
      ),
      p(t("Modern quantization techniques like GPTQ and AWQ maintain model quality while dramatically reducing compute requirements.")),
      h3(t("2. Batching Requests")),
      p(t("Instead of processing requests individually, batch multiple inputs together:")),
      ul(
        li(t("Amortize GPU memory transfer overhead")),
        li(t("Increase throughput by 3-5x")),
        li(t("Reduce per-request costs proportionally")),
      ),
      p(t("Dynamic batching solutions automatically group requests within latency constraints.")),
      h3(t("3. Right-Sizing Infrastructure")),
      p(t("Many teams over-provision GPU resources. Analyze your actual utilization:")),
      ul(
        li(t("Use GPU monitoring to identify idle capacity")),
        li(t("Consider smaller GPU instances for lighter workloads")),
        li(t("Implement auto-scaling based on queue depth")),
      ),
      p(t("Moving from an A100 to an L4 for appropriate workloads can reduce costs by 80%.")),
      h3(t("4. Caching and Request Deduplication")),
      p(t("Implement intelligent caching:")),
      ul(
        li(t("Cache embeddings for repeated content")),
        li(t("Use semantic caching for similar queries")),
        li(t("Deduplicate identical requests in real-time")),
      ),
      p(t("A well-designed cache can eliminate 30-50% of inference calls.")),
      h3(t("5. Spot and Preemptible Instances")),
      p(t("For fault-tolerant workloads:")),
      ul(
        li(t("Use spot instances at 60-90% discount")),
        li(t("Implement graceful degradation")),
        li(t("Distribute across availability zones")),
      ),
      p(t("Combined, these strategies can reduce inference costs by 60% or more while maintaining service quality.")),
    ),
  },
  {
    title: "Building Resilient AI Infrastructure: Lessons from Production Deployments",
    excerpt:
      "Learn how to build AI infrastructure that survives hardware failures, traffic spikes, and model updates. Real lessons from production deployments at scale.",
    author: "Synteq Digital",
    tags: [{ tag: "Infrastructure" }, { tag: "Resilience" }, { tag: "Production" }],
    categoryTitle: "Operations",
    publishedAt: "2025-08-25T12:00:00.000Z",
    heroImageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80",
    content: richText(
      p(t("Production AI systems face unique resilience challenges. Unlike traditional web applications, AI infrastructure must handle GPU failures, model version transitions, and unpredictable inference times. Here's how to build systems that stay running.")),
      h3(t("Embrace Failure as Normal")),
      p(t("GPUs fail more frequently than CPUs. Memory errors, thermal issues, and driver crashes are common. Design for this reality:")),
      ul(
        li(t("Implement health checks that detect degraded GPU performance")),
        li(t("Use redundant inference endpoints across physical machines")),
        li(t("Automate failed node replacement without manual intervention")),
      ),
      h3(t("Load Balancing for AI")),
      p(t("Standard load balancers don't understand AI workloads. Consider:")),
      ul(
        li(t("Request complexity routing: ", 1), t("Send simple queries to smaller models")),
        li(t("GPU memory awareness: ", 1), t("Don't route to nodes with fragmented memory")),
        li(t("Latency-based routing: ", 1), t("Prefer nodes with lower queue depths")),
      ),
      p(t("Custom load balancing logic can improve both reliability and performance.")),
      h3(t("Graceful Model Updates")),
      p(t("Deploying new models shouldn't mean downtime:")),
      ol(
        li(t("Blue-green deployments: ", 1), t("Run old and new models simultaneously")),
        li(t("Shadow testing: ", 1), t("Route traffic to new models without serving responses")),
        li(t("Gradual rollout: ", 1), t("Shift traffic percentage incrementally")),
        li(t("Instant rollback: ", 1), t("Keep previous model versions warm")),
      ),
      h3(t("Handling Traffic Spikes")),
      p(t("AI inference has higher per-request costs than traditional APIs. Protect your infrastructure:")),
      ul(
        li(t("Implement request queuing with configurable timeouts")),
        li(t("Use priority lanes for critical traffic")),
        li(t("Deploy auto-scaling with GPU-aware metrics")),
        li(t("Consider request shedding for graceful degradation")),
      ),
      h3(t("Monitoring That Matters")),
      p(t("Track metrics specific to AI workloads:")),
      ul(
        li(t("Tokens per second (not just requests per second)")),
        li(t("GPU memory utilization over time")),
        li(t("Model-specific latency percentiles")),
        li(t("Cache hit rates and savings")),
      ),
      p(t("Resilient AI infrastructure isn't about preventing failures — it's about recovering from them gracefully.")),
    ),
  },
  {
    title: "Beyond GPUs: The Future of AI Hardware in 2025 and Beyond",
    excerpt:
      "Explore the emerging AI hardware landscape, from custom silicon to neuromorphic chips. Understand what's coming and how to prepare your infrastructure strategy.",
    author: "Synteq Digital",
    tags: [{ tag: "AI Hardware" }, { tag: "GPUs" }, { tag: "Industry Trends" }],
    categoryTitle: "Industry Insights",
    publishedAt: "2025-10-05T12:00:00.000Z",
    heroImageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
    content: richText(
      p(t("While GPUs dominate today's AI landscape, the hardware ecosystem is evolving rapidly. Understanding emerging technologies helps organizations make smarter infrastructure investments.")),
      h3(t("The Custom Silicon Revolution")),
      p(t("Major cloud providers are developing custom AI accelerators:")),
      ul(
        li(t("Google TPUs: ", 1), t("Now in their fifth generation, offering superior price-performance for transformer models")),
        li(t("AWS Trainium/Inferentia: ", 1), t("Purpose-built chips for training and inference")),
        li(t("Microsoft Maia: ", 1), t("Custom accelerators optimized for Azure AI services")),
      ),
      p(t("These chips sacrifice general-purpose flexibility for AI-specific performance gains of 2-3x over commodity GPUs.")),
      h3(t("The Rise of Inference-Specific Hardware")),
      p(t("Training and inference have different requirements. New hardware targets inference specifically:")),
      ul(
        li(t("Lower precision support (INT4, FP8)")),
        li(t("Higher memory bandwidth relative to compute")),
        li(t("Better power efficiency for edge deployment")),
        li(t("Optimized for specific model architectures")),
      ),
      p(t("Inference-focused hardware can deliver 10x better performance per watt than training GPUs.")),
      h3(t("Neuromorphic Computing")),
      p(t("Inspired by biological neurons, neuromorphic chips process information differently:")),
      ul(
        li(t("Event-driven computation (only active when needed)")),
        li(t("Extreme power efficiency (milliwatts vs kilowatts)")),
        li(t("Natural fit for temporal and sensor data")),
      ),
      p(t("While still maturing, neuromorphic systems show promise for edge AI and always-on applications.")),
      h3(t("Photonic Computing")),
      p(t("Using light instead of electrons, photonic processors offer:")),
      ul(
        li(t("Near-zero latency for matrix operations")),
        li(t("Minimal heat generation")),
        li(t("Potential for massive parallelism")),
      ),
      p(t("Early photonic accelerators are entering the market for specific AI workloads.")),
      h3(t("Preparing for Change")),
      p(t("To future-proof your AI infrastructure:")),
      ol(
        li(t("Avoid vendor lock-in: ", 1), t("Use abstraction layers like ONNX")),
        li(t("Monitor the ecosystem: ", 1), t("Track hardware announcements and benchmarks")),
        li(t("Build flexible architectures: ", 1), t("Design for hardware heterogeneity")),
        li(t("Partner strategically: ", 1), t("Work with providers investing in next-gen hardware")),
      ),
      p(t("The AI hardware landscape will look dramatically different in five years. Organizations that adapt will have significant competitive advantages.")),
    ),
  },
];

// ─── Success Stories ───────────────────────────────────────────────

const successStories = [
  {
    title: "Building a Partnership That Grows Together",
    excerpt:
      "How Block Mining Group leveraged a trusted hardware partnership with Synteq's founding team to deploy $5.5 million in mining equipment and scale from startup to industry leader.",
    client: "Block Mining Group",
    industry: "technology" as const,
    publishedAt: "2024-03-15T12:00:00.000Z",
    coverImageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=720&fit=crop",
    clientLogoPath: "public/assets/hardware/bitmain-logo.svg",
    metrics: [
      { label: "Hardware Investment", value: "$5.5M" },
      { label: "Equipment Type", value: "S19 ASICs" },
      { label: "Facility Location", value: "Kentucky" },
    ],
    testimonial: {
      quote:
        "Cryptech is the first source we go to when looking for mining equipment. It's not just about making sales — it's about building a foundation of trust for lasting relationships.",
      author: "Michael Stoltzner",
      role: "Co-Founder, Block Mining Group",
    },
    content: richText(
      p(
        t(
          "Block Mining Group, formerly known as Blockware Mining, specializes in Bitcoin mining infrastructure and colocation services. Over the past several years, the company has experienced significant growth — with strategic partnerships playing a crucial role in their success."
        )
      ),
      h2(t("A Relationship Built on Trust")),
      p(
        t(
          "Co-founder Michael Stoltzner began purchasing hardware from Cryptech Solutions (now Synteq Digital) in 2019. What started as a transactional relationship quickly evolved into a collaborative partnership, built on shared values of reliability and quality."
        )
      ),
      p(
        t(
          "\"Cryptech is the first source we go to when looking for mining equipment,\" Stoltzner says. Both companies developed a reciprocal business model where they buy and sell from each other, creating a relationship that Stoltzner characterizes as having \"grown together.\""
        )
      ),
      h2(t("Scaling Up: A Landmark Transaction")),
      p(
        t(
          "In fall 2021, Block Mining Group made a significant capital investment — purchasing $5.5 million worth of S19 mining equipment. The hardware was deployed at a new Kentucky facility that opened in 2022, marking a major expansion milestone for the company. The transaction was described as \"smooth and efficient,\" reflecting the trust built over years of partnership."
        )
      ),
      h2(t("The Value of Partnership in a Fast-Moving Industry")),
      p(
        t(
          "In Bitcoin mining's fast-paced and volatile environment, establishing strong partner networks is essential for sustained growth and success. As Joe Stefanelli, Synteq Digital President, puts it: \"It's not just about making sales; it's about building a foundation of trust for lasting relationships.\""
        )
      )
    ),
  },
  {
    title: "From Power Generation to Public Mining Company",
    excerpt:
      "How Stronghold Digital Mining transformed from a power generation company into a vertically integrated, publicly traded Bitcoin mining operation with Synteq's partnership.",
    client: "Stronghold Digital Mining",
    industry: "energy" as const,
    publishedAt: "2024-05-20T12:00:00.000Z",
    coverImageUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&h=720&fit=crop",
    clientLogoPath: "public/images/brands/Stronghold.png",
    metrics: [
      { label: "Power Capacity", value: "85 MW" },
      { label: "Outcome", value: "IPO in 2021" },
      { label: "Mining Type", value: "Vertically Integrated" },
    ],
    testimonial: {
      quote:
        "They have longstanding relationships with leaders in the industry. Their expertise is handy to have, and they're very approachable and friendly.",
      author: "Greg Beard",
      role: "CEO, Stronghold Digital Mining",
    },
    content: richText(
      p(
        t(
          "Stronghold Digital Mining exemplifies a company that successfully transformed its business with strategic partnership support. Originally a power generation company, Stronghold identified the opportunity in digital mining and strategically pivoted — while maintaining the ability to sell power to the electrical grid."
        )
      ),
      h2(t("An Ambitious Transformation")),
      p(
        t(
          "Converting an 85 MW power plant into a mining operation with portable data centers required substantial expertise and resources. When Cryptech Solutions (now Synteq Digital) first met Stronghold in 2020, the company was in its pilot phase with a small mining operation, seeking a reputable hardware supplier."
        )
      ),
      p(
        t(
          "As transformation opportunities emerged, Stronghold required a partner offering comprehensive support. Synteq's founding team delivered hardware, sourced hosting clients, and contributed valuable industry knowledge and consulting — going well beyond a simple vendor relationship."
        )
      ),
      h2(t("A Path to the Public Markets")),
      p(
        t(
          "Today, Stronghold operates as a vertically integrated, environmentally beneficial Bitcoin mining company. The company owns its generation infrastructure and powers operations through coal refuse site reclamation across Pennsylvania — effectively remediating legacy coal mining impacts while generating revenue."
        )
      ),
      p(
        t(
          "The partnership contributed directly to Stronghold's successful 2021 IPO, positioning the company among the select few publicly traded U.S. mining enterprises. This success demonstrates the value of strategic partnerships when entering new industries — with the right support and resources, companies can become industry leaders."
        )
      )
    ),
  },
  {
    title: "Scaling to Gigawatt Operations with Reliable Supply",
    excerpt:
      "How a major publicly traded mining operator relied on Synteq's global sourcing network and Bitmain partnership to secure hardware for a rapid multi-site expansion.",
    client: "CleanSpark",
    industry: "technology" as const,
    publishedAt: "2025-01-10T12:00:00.000Z",
    coverImageUrl: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&h=720&fit=crop",
    clientLogoPath: "public/images/brands/Cleanspark.svg",
    metrics: [
      { label: "Deployment Scale", value: "1+ GW" },
      { label: "Hardware Sourced", value: "50,000+ ASICs" },
      { label: "Delivery Timeline", value: "On Schedule" },
    ],
    testimonial: {
      quote:
        "When you're scaling at the pace we are, you need supply chain partners who can deliver at enterprise volume with zero excuses. Synteq consistently delivers.",
      author: "Enterprise Client",
      role: "VP of Operations",
    },
    content: richText(
      p(
        t(
          "As one of the largest publicly traded Bitcoin mining companies in North America, this enterprise client needed a hardware partner capable of matching their aggressive growth trajectory. With operations spanning multiple states and plans to exceed one gigawatt of total capacity, supply chain reliability wasn't just important — it was existential."
        )
      ),
      h2(t("The Challenge: Enterprise-Scale Procurement")),
      p(
        t(
          "Scaling a digital mining operation to gigawatt levels requires tens of thousands of ASIC units, delivered on tight timelines and often coordinated across multiple sites simultaneously. Supply constraints, tariff uncertainties, and manufacturer allocation limits add layers of complexity that can derail even well-funded expansion plans."
        )
      ),
      h2(t("Synteq's Solution")),
      p(
        t(
          "As Bitmain's exclusive U.S. Hashrate Ambassador, Synteq Digital provided priority allocation access and multi-country sourcing capabilities. The team coordinated logistics across Malaysia, Indonesia, Thailand, and direct US/Canadian batches — leveraging tariff-free sourcing routes to optimize total cost of ownership."
        )
      ),
      p(
        t(
          "Beyond hardware procurement, Synteq's consulting team assisted with deployment planning, site preparation guidance, and ongoing fleet management recommendations — ensuring each facility was operationally ready to receive and energize equipment on schedule."
        )
      ),
      h2(t("Results")),
      p(
        t(
          "Over 50,000 ASICs were sourced and delivered across multiple facilities, all meeting or exceeding the client's deployment timeline. The partnership demonstrated that reliable, enterprise-scale hardware procurement is achievable with the right sourcing network and operational expertise."
        )
      )
    ),
  },
  {
    title: "Affordable HPC Infrastructure for AI Startups",
    excerpt:
      "How Crunchbits' cost-effective dedicated servers and GPU hosting enabled a growing AI startup to iterate faster without breaking the bank.",
    client: "AI Research Startup",
    industry: "technology" as const,
    publishedAt: "2025-08-05T12:00:00.000Z",
    coverImageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200&h=720&fit=crop",
    clientLogoPath: "public/assets/hardware/lenovo-logo.svg",
    metrics: [
      { label: "Cost Savings", value: "45%" },
      { label: "Uptime Achieved", value: "99.99%" },
      { label: "GPU Servers Deployed", value: "24" },
    ],
    testimonial: {
      quote:
        "We evaluated every major cloud provider. Crunchbits gave us the same performance at nearly half the cost, with dedicated hardware we could actually rely on.",
      author: "Technical Co-Founder",
      role: "AI Startup",
    },
    content: richText(
      p(
        t(
          "For early-stage AI companies, compute costs can make or break the business. Cloud GPU pricing from hyperscalers often consumes a disproportionate share of runway, forcing teams to make difficult trade-offs between experimentation speed and budget constraints."
        )
      ),
      h2(t("The Challenge")),
      p(
        t(
          "This AI research startup needed reliable GPU compute for training and fine-tuning large language models. The team had been using a major cloud provider but found costs unsustainable as their models grew in complexity and training runs became longer."
        )
      ),
      h2(t("Crunchbits: Synteq's HPC Division")),
      p(
        t(
          "Crunchbits, acquired by Synteq Digital in May 2025, specializes in affordable, high-performance server solutions. Operating seven data centers across Washington, Pennsylvania, New York, and Texas, Crunchbits offers dedicated servers, VPS, VDS, and GPU hosting with a 99.99% uptime SLA."
        )
      ),
      p(
        t(
          "The startup migrated their training workloads to 24 dedicated GPU servers, gaining exclusive access to hardware resources without the noisy-neighbor issues common in shared cloud environments. The dedicated infrastructure delivered consistent, predictable performance for their training pipelines."
        )
      ),
      h2(t("Results")),
      p(
        t(
          "The migration reduced compute costs by 45% compared to their previous cloud provider, while actually improving training iteration speed due to dedicated hardware access. The 99.99% uptime SLA meant fewer interrupted training runs and more productive engineering hours. As the startup scaled, Crunchbits' custom solutions approach allowed them to add capacity incrementally without committing to long-term cloud contracts."
        )
      )
    ),
  },
  {
    title: "International Fleet Management Across Three Continents",
    excerpt:
      "How Synteq helped a multinational mining operator manage hardware procurement, logistics, and fleet lifecycle across operations in North America, Northern Europe, and Southeast Asia.",
    client: "Multinational Mining Operator",
    industry: "technology" as const,
    publishedAt: "2025-11-01T12:00:00.000Z",
    coverImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=720&fit=crop",
    clientLogoPath: "public/images/brands/Cathedra.png",
    metrics: [
      { label: "Countries Served", value: "8" },
      { label: "Fleet Size", value: "30,000+ ASICs" },
      { label: "Logistics Coordinated", value: "3 Continents" },
    ],
    testimonial: {
      quote:
        "Managing hardware across multiple jurisdictions with different regulations, tariffs, and logistics challenges requires a partner who truly understands the global landscape. Synteq is that partner.",
      author: "Director of Global Operations",
      role: "Multinational Mining Operator",
    },
    content: richText(
      p(
        t(
          "Operating mining infrastructure across multiple countries and continents introduces a unique set of challenges — from navigating tariffs and export controls to coordinating logistics timelines across different regulatory environments. This multinational operator needed a single partner who could handle the complexity."
        )
      ),
      h2(t("Global Sourcing and Logistics")),
      p(
        t(
          "Synteq Digital's sourcing network spans 30 countries, with direct relationships across manufacturer facilities in Asia and distribution channels worldwide. For this client, the team coordinated hardware procurement from multiple sources — securing competitive pricing while navigating tariff structures and customs requirements for each destination."
        )
      ),
      h2(t("Fleet Lifecycle Management")),
      p(
        t(
          "Beyond initial procurement, Synteq provided ongoing fleet lifecycle support. As hardware aged at certain sites, the team managed the cascade — refreshing high-value locations with newer equipment while redeploying older units to sites with lower power costs where they remained profitable."
        )
      ),
      p(
        t(
          "When units reached true end-of-life, Synteq's fleet refresh and repair services recovered residual value through refurbishment and international resale channels, ensuring the client maximized return on their hardware investment across its full lifecycle."
        )
      ),
      h2(t("A Single Point of Contact")),
      p(
        t(
          "Rather than managing relationships with multiple vendors across different regions, the client relied on Synteq as their single point of contact for all hardware-related needs. This simplified procurement, reduced administrative overhead, and ensured consistent quality and service levels regardless of geography."
        )
      )
    ),
  },
];

// ─── Press Releases ────────────────────────────────────────────────

const pressReleases = [
  {
    title:
      "Bitcoin Mining and HPC Leaders Unite to Create Synteq Digital",
    excerpt:
      "SunnySide Digital and Cryptech Solutions merge to form Synteq Digital, a comprehensive platform for enterprise digital mining and HPC infrastructure services.",
    source: "Bitcoin Magazine",
    releaseDate: "2024-07-24",
    publishedAt: "2024-07-24T16:00:00.000Z",
    content: richText(
      p(
        t("WILMINGTON, Del. — ", 1),
        t(
          "Two wholesale distributors and service providers for digital asset mining and high-performance computing equipment — SunnySide Digital and Cryptech Solutions — have combined to launch Synteq Digital. The new company aims to serve the expanding digital mining and HPC sectors at scale."
        )
      ),
      h2(t("A New Market Participant")),
      p(
        t(
          "Taras Kulyk, CEO of Synteq and founder of SunnySide, expressed enthusiasm about the merger: \"We are very excited to create a new market participant by combining our respective teams, core values, and reputational cache to form Synteq. The entity will provide the scale and breadth of services to our enterprise and commercial scale clients and partners in the HPC & digital mining data center sectors.\""
        )
      ),
      h2(t("Expanded Service Offerings")),
      p(
        t(
          "Synteq Digital will provide GPU/HPC hardware procurement and wholesaling, colocation services, Just-In-Time DataCenter consignment parts and supply, and an Enterprise Fleet Refresh Service Model for cleaning, upgrading, and repairing legacy mining hardware."
        )
      ),
      h2(t("Bitmain Partnership")),
      p(
        t(
          "Joe Stefanelli, Synteq President and former Cryptech CEO, highlighted a significant partnership: Synteq will serve as Bitmain Technologies' exclusive U.S. distribution partner and \"Hashrate Ambassador.\" \"It's the first time that Bitmain is acknowledging partners in the industry,\" Stefanelli noted."
        )
      ),
      h2(t("Industry Consolidation Response")),
      p(
        t(
          "The combination responds to industry consolidation trends. \"There's a ton of M&A and our clients are scaling up and getting bigger,\" Kulyk explained. \"We're now dealing with operators that have a gigawatt of power under operation and control, and they want somebody who can provide services and solutions at the scale that they need in a timely fashion with reliability as well as professionalism.\""
        )
      ),
      h2(t("About Synteq Digital")),
      p(
        t(
          "Synteq Digital is a comprehensive platform for digital mining and high-performance computing infrastructure, hardware, and services. Headquartered in Wilmington, Delaware, the company serves enterprise and commercial-scale clients globally."
        )
      )
    ),
  },
  {
    title:
      "Synteq Digital Appoints Jaime Leverton and Robert Fedrock to Board of Directors",
    excerpt:
      "Two industry veterans join Synteq Digital's Board, bringing over 45 years of combined leadership experience across technology, data centers, and investment banking.",
    source: "PRWeb",
    releaseDate: "2024-09-05",
    publishedAt: "2024-09-05T12:00:00.000Z",
    content: richText(
      p(
        t("WILMINGTON, Del. — ", 1),
        t(
          "Synteq Digital, a provider of infrastructure and services for digital mining and HPC data centers, has appointed two industry veterans to its Board of Directors: Jaime Leverton and Robert Fedrock."
        )
      ),
      h2(t("Jaime Leverton")),
      p(
        t(
          "Jaime Leverton brings 25 years of executive experience across technology and data center sectors. She previously served as CEO of Hut 8, one of North America's largest Bitcoin mining companies, and held leadership roles at eStruxture Data Centers, BlackBerry, and IBM."
        )
      ),
      h2(t("Robert Fedrock")),
      p(
        t(
          "Robert Fedrock is a Managing Director at Origin Merchant Partners investment bank with over 20 years of experience in investment banking and private equity. He previously advised companies on mergers and acquisitions at CIBC World Markets and Canaccord Genuity."
        )
      ),
      h2(t("Strategic Significance")),
      p(
        t(
          "CEO Taras Kulyk noted that Leverton's mining industry expertise and Fedrock's M&A experience will guide \"our next phase of growth.\" Together, the new board members contribute over 45 years of combined leadership experience in technology, data centers, and capital markets."
        )
      )
    ),
  },
  {
    title:
      "Synteq Digital Welcomes New Chief Financial Officer, Manash Goswami",
    excerpt:
      "Veteran finance executive Manash Goswami, CPA, CFA, MBA, joins Synteq Digital to build the financial and accounting frameworks supporting long-term value creation.",
    source: "PR Newswire",
    releaseDate: "2024-12-18",
    publishedAt: "2024-12-18T12:00:00.000Z",
    content: richText(
      p(
        t("WILMINGTON, Del. — ", 1),
        t(
          "Synteq Digital announced the appointment of Manash Goswami, CPA, CFA, MBA, as Chief Financial Officer, effective December 18, 2024."
        )
      ),
      h2(t("Leadership Experience")),
      p(
        t(
          "Goswami brings over 25 years of professional experience spanning technology, power infrastructure, warehouse logistics, e-commerce, and capital markets. His previous positions include roles at Blacksquare Inc. and CI Global Asset Management, where the latter managed over $450 billion in assets under management."
        )
      ),
      p(
        t(
          "At CI Global, he drove growth initiatives, strategic planning, and investor relations. His educational background includes degrees from Queens University and the Richard Ivey School of Business, and he has received multiple awards for portfolio management expertise."
        )
      ),
      h2(t("CEO Commentary")),
      p(
        t(
          "\"In addition to his deep financial expertise, he brings a proven track record of driving growth and building financial and accounting frameworks that support long-term value creation,\" said CEO Taras Kulyk."
        )
      ),
      p(
        t(
          "Goswami expressed his enthusiasm: \"I look forward to working with the talented team to build on the company's strong foundation and help drive continued success and innovation.\""
        )
      )
    ),
  },
  {
    title:
      "Synteq Digital Announces Acquisition of Crunchbits, Accelerating Expansion into High-Performance Computing",
    excerpt:
      "Synteq Digital acquires Crunchbits LLC, an HPC infrastructure provider operating seven data centers, marking the company's formal entry into enterprise computing services.",
    source: "PR Newswire",
    releaseDate: "2025-05-06",
    publishedAt: "2025-05-06T12:00:00.000Z",
    content: richText(
      p(
        t("WILMINGTON, Del. — ", 1),
        t(
          "Synteq Digital announced it has entered into a binding agreement to acquire Crunchbits LLC, a high-performance computing infrastructure provider specializing in affordable server solutions including VPS, VDS, dedicated servers, and GPU servers."
        )
      ),
      h2(t("About Crunchbits")),
      p(
        t(
          "Crunchbits operates seven active data centers across Washington State, Pennsylvania, New York, and Texas. The company has built a reputation for reliability, scalability, and cost-effective infrastructure since its founding in 2021."
        )
      ),
      h2(t("Leadership Transition")),
      p(
        t(
          "Founder Eric Yingling joins Synteq as VP of HPC Operations, while CTO Yann St. Arnaud becomes Director of HPC Technical Operations. The existing Crunchbits team remains in place, with Yingling continuing as a direct client contact."
        )
      ),
      p(
        t(
          "\"Synteq provides a powerful corporate platform for growth, allowing us to deliver enhanced value to our customers through superior hardware, faster support, and deeper technical expertise,\" said Yingling. He brings over a decade of data center experience, including U.S. Marine Corps service."
        )
      ),
      h2(t("Strategic Significance")),
      p(
        t(
          "The acquisition marks Synteq Digital's formal entry into enterprise high-performance computing services, complementing its existing digital mining hardware and infrastructure business. Customers will gain access to Synteq's capital, engineering resources, and global infrastructure while Crunchbits maintains its operational approach and commitment to affordability."
        )
      ),
      h2(t("Advisors")),
      p(
        t(
          "Keefe, Bruyette & Woods (a Stifel Company) served as financial advisor. Cozen O'Connor LLP provided legal counsel."
        )
      )
    ),
  },
  {
    title:
      "Synteq Digital Enters into Strategic Real Estate Acquisition from Horizon Kinetics, Welcoming Its First Institutional Shareholder",
    excerpt:
      "Synteq Digital acquires strategic data center real estate in North Carolina from Horizon Kinetics and FRMO Corp., welcoming Horizon as its first institutional shareholder.",
    source: "PR Newswire",
    releaseDate: "2025-12-15",
    publishedAt: "2025-12-15T21:35:00.000Z",
    content: richText(
      p(
        t("WILMINGTON, Del. — ", 1),
        t(
          "Synteq Digital announced it has entered into definitive agreements with Horizon Kinetics and FRMO Corp. for a strategic real estate acquisition, including a data center in North Carolina with approximately 10 MW of capacity."
        )
      ),
      h2(t("A Milestone Transaction")),
      p(
        t(
          "The all-equity transaction represents a significant milestone in Synteq's growth strategy. Horizon Kinetics, a New York City-based fund manager with approximately $10.4 billion in assets under management, will become a shareholder of Synteq upon completion — marking the firm's first institutional shareholder."
        )
      ),
      h2(t("Strategic Expansion")),
      p(
        t(
          "This real asset transaction marks the first phase of Synteq Digital's broader strategic expansion. The acquisition strengthens Synteq's physical infrastructure footprint and reinforces its mission to diversify and provide additional value-added services for clients in the digital mining and high-performance computing sectors."
        )
      ),
      h2(t("About the Partners")),
      p(
        t(
          "Horizon Kinetics is a New York City-based investment management firm. FRMO Corp. invests in and receives revenues based upon consulting and advisory fee interests in the asset management sector."
        )
      )
    ),
  },
  {
    title:
      "Synteq Digital Acquires HMTech Operations and Strategic Data Center Assets, Expanding into ASIC and GPU Repair & Refurbishment",
    excerpt:
      "Synteq Digital closes a transformative acquisition of HMTech's operations and two Texas data centers with 30 MW capacity, establishing a new GPU Repair and Refurbishment Division.",
    source: "PR Newswire",
    releaseDate: "2026-02-09",
    publishedAt: "2026-02-09T12:00:00.000Z",
    content: richText(
      p(
        t("WILMINGTON, Del. — ", 1),
        t(
          "Synteq Digital announced the closing of its acquisition of HMTech's operational assets, including repair facilities and two Texas data centers with 30 MW capacity. The deal marks Synteq's expansion into GPU repair and refurbishment services alongside its existing high-performance computing infrastructure operations."
        )
      ),
      h2(t("A Vertically Integrated Platform")),
      p(
        t(
          "The combined assets from HMTech, along with previously announced real estate acquisitions from Horizon Kinetics and FRMO Corp., create a vertically integrated service platform. Synteq will leverage HMTech's ASIC repair expertise to establish a new GPU Repair and Refurbishment Division, targeting the booming demand for AI and HPC hardware maintenance."
        )
      ),
      h2(t("Leadership Transition")),
      p(
        t(
          "HMTech CEO Gerald Wilkie joined Synteq's leadership as Vice President of Mining Site Development. Most HMTech staff transitioned to Synteq to maintain continuity for existing clients."
        )
      ),
      h2(t("Executive Perspective")),
      p(
        t(
          "CEO Taras Kulyk stated: \"By combining HMTech's world-class technical operations with strategic real estate in Texas and North Carolina, we are securing both the talent and the physical footprint needed to dominate the next phase of digital infrastructure.\""
        )
      ),
      p(
        t(
          "Wilkie added: \"Joining forces with Synteq provides HMTech with the platform and resources to scale our operations at a pace that wouldn't be possible independently.\""
        )
      ),
      h2(t("Transaction Details")),
      p(
        t(
          "Majority consideration was settled in equity. KBW (a Stifel Company) served as financial advisor. Cozen O'Connor LLP provided legal counsel."
        )
      )
    ),
  },
  {
    title:
      "Synteq Digital Appoints Will Wang as General Counsel to Lead Legal Execution of M&A-Driven HPC and Data Center Services Expansion",
    excerpt:
      "M&A and capital markets veteran Will Wang joins Synteq Digital as SVP, General Counsel to structure and close complex transactions powering the company's platform growth.",
    source: "PR Newswire",
    releaseDate: "2026-02-20",
    publishedAt: "2026-02-20T12:00:00.000Z",
    content: richText(
      p(
        t("WILMINGTON, Del. — ", 1),
        t(
          "Synteq Digital announced the appointment of Will Wang as Senior Vice President and General Counsel, a critical leadership hire as the company continues its platform expansion via acquisitions across the enterprise high-performance computing and data center sector."
        )
      ),
      h2(t("Background")),
      p(
        t(
          "Wang transitions from Goodwin Procter LLP, where he served as external counsel to Synteq on previous acquisitions and corporate matters. He brings over a decade of experience advising technology companies and institutional investors on mergers and acquisitions, capital markets, and corporate governance across billions of dollars in transactions."
        )
      ),
      p(
        t(
          "Prior to Goodwin Procter, Wang worked as an associate at Skadden, Arps, Slate, Meagher & Flom LLP. He holds law degrees from Harvard Law School and Renmin University of China's Law School, and is admitted to practice in New York and California."
        )
      ),
      h2(t("Role and Responsibilities")),
      p(
        t(
          "As General Counsel, Wang will serve as the Board's primary legal advisor and executive leadership team member, focusing on structuring and closing complex, cross-border transactions while aligning legal strategy with corporate development goals."
        )
      ),
      h2(t("Executive Commentary")),
      p(
        t(
          "CEO Taras Kulyk stated: \"Will's appointment reflects the pace and scale at which we continue to execute our platform growth strategy. Building on the momentum of three strategic acquisitions completed over the last twelve months, we are strengthening our internal legal function to keep pace with our aggressive growth trajectory.\""
        )
      ),
      p(
        t(
          "Wang commented: \"The enterprise HPC and data center ecosystem represents one of the most dynamic growth opportunities in technology today.\""
        )
      )
    ),
  },
];

// ─── Authors ──────────────────────────────────────────────────────

const authors = [
  {
    name: "Taras Kulyk",
    title: "CEO & Founder",
    photoPath: "/images/team/taras.png",
  },
  {
    name: "Joe Stefko",
    title: "COO",
    photoPath: "/images/team/joe.png",
  },
  {
    name: "Manash Goswami",
    title: "CFO",
    photoPath: "/images/team/manash.png",
  },
  {
    name: "Jaime Leverton",
    title: "Board Director",
    photoPath: "/images/team/jamie.png",
  },
  {
    name: "Rob Fedrock",
    title: "Board Director",
    photoPath: "/images/team/rob.png",
  },
];

// Map blog titles to author names (only some posts get byline authors)
const postAuthorAssignments: Record<string, string[]> = {
  "How to Start Mining Bitcoin": ["Taras Kulyk"],
  "Navigating the Post-Halving Landscape": ["Taras Kulyk", "Joe Stefko"],
  "June 2025 Monthly Bitcoin Mining Market Update": ["Manash Goswami"],
};

// Map PR titles to author names (only some PRs get byline authors)
const prAuthorAssignments: Record<string, string[]> = {
  "Synteq Digital Announces Acquisition of Crunchbits, Accelerating Expansion into High-Performance Computing":
    ["Taras Kulyk"],
  "Synteq Digital Enters into Strategic Real Estate Acquisition from Horizon Kinetics, Welcoming Its First Institutional Shareholder":
    ["Taras Kulyk", "Manash Goswami"],
  "Synteq Digital Acquires HMTech Operations and Strategic Data Center Assets, Expanding into ASIC and GPU Repair & Refurbishment":
    ["Taras Kulyk", "Joe Stefko"],
};

// ─── Seed handler ──────────────────────────────────────────────────

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== "synteq-seed-2026") {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const payload = await getPayload({ config });
  const results: Record<string, number> = {
    categories: 0,
    authors: 0,
    posts: 0,
    successStories: 0,
    pressReleases: 0,
  };

  try {
    // ── 1. Create categories ──
    const categoryMap: Record<string, number> = {};
    for (const title of categories) {
      const existing = await payload.find({
        collection: "categories",
        where: { title: { equals: title } },
        limit: 1,
      });
      if (existing.docs.length > 0) {
        categoryMap[title] = existing.docs[0].id as number;
        continue;
      }
      const doc = await payload.create({
        collection: "categories",
        data: { title },
      });
      categoryMap[title] = doc.id as number;
      results.categories++;
    }

    // ── 2. Create authors with headshot uploads ──
    const authorMap: Record<string, number> = {};
    for (const author of authors) {
      const existing = await payload.find({
        collection: "authors",
        where: { name: { equals: author.name } },
        limit: 1,
      });
      if (existing.docs.length > 0) {
        authorMap[author.name] = existing.docs[0].id as number;
        continue;
      }

      // Upload headshot photo to media collection
      let photoId: number | undefined;
      try {
        const fs = await import("fs");
        const path = await import("path");
        const filePath = path.join(process.cwd(), "public", author.photoPath);
        if (fs.existsSync(filePath)) {
          const buffer = fs.readFileSync(filePath);
          const ext = path.extname(author.photoPath).slice(1);
          const mimeType = ext === "png" ? "image/png" : "image/webp";
          const fileName = `author-${author.name.toLowerCase().replace(/\s+/g, "-")}.${ext}`;

          const mediaDoc = await payload.create({
            collection: "media",
            data: {
              alt: `${author.name} headshot`,
            },
            file: {
              data: buffer,
              mimetype: mimeType,
              name: fileName,
              size: buffer.length,
            },
          });
          photoId = mediaDoc.id as number;
        }
      } catch {
        // Skip photo upload if it fails — author still gets created
      }

      const doc = await payload.create({
        collection: "authors",
        data: {
          name: author.name,
          title: author.title,
          ...(photoId ? { photo: photoId } : {}),
        },
      });
      authorMap[author.name] = doc.id as number;
      results.authors++;
    }

    // ── 3. Create blog posts (or update content / authors on existing) ──
    for (const post of blogPosts) {
      const existing = await payload.find({
        collection: "posts",
        where: { title: { equals: post.title } },
        limit: 1,
      });

      const assignedAuthors = postAuthorAssignments[post.title];
      const bylineAuthorIds = assignedAuthors
        ?.map((name) => authorMap[name])
        .filter(Boolean);

      // Upload hero image if the post defines one
      let heroImageId: number | undefined;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const heroUrl = (post as Record<string, any>).heroImageUrl as string | undefined;
      if (heroUrl) {
        try {
          const res = await fetch(heroUrl);
          if (res.ok) {
            const buffer = Buffer.from(await res.arrayBuffer());
            const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40);
            const mediaDoc = await payload.create({
              collection: "media",
              data: { alt: `${post.title} hero image` },
              file: {
                data: buffer,
                mimetype: "image/jpeg",
                name: `hero-${slug}.jpg`,
                size: buffer.length,
              },
            });
            heroImageId = mediaDoc.id as number;
          }
        } catch {
          // Skip hero image if fetch/upload fails
        }
      }

      if (existing.docs.length > 0) {
        // Always update content + authors + heroImage on existing posts
        const doc = existing.docs[0];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updates: Record<string, any> = { content: post.content };
        if (bylineAuthorIds?.length) {
          updates.bylineAuthors = bylineAuthorIds;
        }
        if (heroImageId) {
          updates.heroImage = heroImageId;
        }
        await payload.update({
          collection: "posts",
          id: doc.id,
          data: updates,
        });
        continue;
      }

      const categoryId = categoryMap[post.categoryTitle];
      await payload.create({
        collection: "posts",
        data: {
          title: post.title,
          excerpt: post.excerpt,
          author: post.author,
          tags: post.tags,
          content: post.content,
          publishedAt: post.publishedAt,
          categories: categoryId ? [categoryId] : [],
          ...(bylineAuthorIds?.length ? { bylineAuthors: bylineAuthorIds } : {}),
          ...(heroImageId ? { heroImage: heroImageId } : {}),
          _status: "published",
        },
        draft: false,
      });
      results.posts++;
    }

    // ── 4. Create success stories ──
    for (const story of successStories) {
      // Upload cover image if URL provided
      let coverImageId: number | undefined;
      const coverUrl = (story as Record<string, unknown>).coverImageUrl as string | undefined;
      if (coverUrl) {
        try {
          const res = await fetch(coverUrl);
          if (res.ok) {
            const buffer = Buffer.from(await res.arrayBuffer());
            const slug = story.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40);
            const mediaDoc = await payload.create({
              collection: "media",
              data: { alt: `${story.client} cover image` },
              file: { data: buffer, mimetype: "image/jpeg", name: `cover-${slug}.jpg`, size: buffer.length },
            });
            coverImageId = mediaDoc.id as number;
          }
        } catch { /* skip */ }
      }

      // Upload client logo from local file
      let clientLogoId: number | undefined;
      const logoPath = (story as Record<string, unknown>).clientLogoPath as string | undefined;
      if (logoPath) {
        try {
          const fullPath = join(process.cwd(), logoPath);
          const buffer = readFileSync(fullPath);
          const ext = extname(logoPath).slice(1); // "svg", "png"
          const mimetype = ext === "svg" ? "image/svg+xml" : `image/${ext}`;
          const slug = story.client.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30);
          const mediaDoc = await payload.create({
            collection: "media",
            data: { alt: `${story.client} logo` },
            file: { data: buffer, mimetype, name: `logo-${slug}.${ext}`, size: buffer.length },
          });
          clientLogoId = mediaDoc.id as number;
        } catch { /* skip */ }
      }

      const existing = await payload.find({
        collection: "success-stories",
        where: { title: { equals: story.title } },
        limit: 1,
      });

      if (existing.docs.length > 0) {
        // Update existing stories with images
        const updates: Record<string, unknown> = {};
        if (coverImageId) updates.coverImage = coverImageId;
        if (clientLogoId) updates.clientLogo = clientLogoId;
        if (Object.keys(updates).length > 0) {
          await payload.update({
            collection: "success-stories",
            id: existing.docs[0].id,
            data: updates,
          });
        }
        continue;
      }

      await payload.create({
        collection: "success-stories",
        data: {
          title: story.title,
          excerpt: story.excerpt,
          client: story.client,
          industry: story.industry,
          content: story.content,
          metrics: story.metrics,
          testimonial: story.testimonial,
          publishedAt: story.publishedAt,
          ...(coverImageId ? { coverImage: coverImageId } : {}),
          ...(clientLogoId ? { clientLogo: clientLogoId } : {}),
          _status: "published",
        },
        draft: false,
      });
      results.successStories++;
    }

    // ── 5. Create press releases (or patch authors on existing) ──
    for (const pr of pressReleases) {
      const existing = await payload.find({
        collection: "press-releases",
        where: { title: { equals: pr.title } },
        limit: 1,
      });

      const assignedAuthors = prAuthorAssignments[pr.title];
      const bylineAuthorIds = assignedAuthors
        ?.map((name) => authorMap[name])
        .filter(Boolean);

      if (existing.docs.length > 0) {
        // Patch authors onto existing PRs that don't have them yet
        const doc = existing.docs[0];
        if (bylineAuthorIds?.length && (!doc.bylineAuthors || doc.bylineAuthors.length === 0)) {
          await payload.update({
            collection: "press-releases",
            id: doc.id,
            data: { bylineAuthors: bylineAuthorIds },
          });
        }
        continue;
      }

      await payload.create({
        collection: "press-releases",
        data: {
          title: pr.title,
          excerpt: pr.excerpt,
          source: pr.source,
          releaseDate: pr.releaseDate,
          content: pr.content,
          publishedAt: pr.publishedAt,
          ...(bylineAuthorIds?.length ? { bylineAuthors: bylineAuthorIds } : {}),
          _status: "published",
        },
        draft: false,
      });
      results.pressReleases++;
    }

    return NextResponse.json({
      success: true,
      created: results,
      message: `Created ${results.categories} categories, ${results.authors} authors, ${results.posts} posts, ${results.successStories} success stories, ${results.pressReleases} press releases`,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: String(error), details: error },
      { status: 500 }
    );
  }
}
