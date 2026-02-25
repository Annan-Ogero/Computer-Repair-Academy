// ============================================================
// UNITS DATA — 120+ Comprehensive Units
// Each unit has deep content, diagrams, practical steps, and tests
// ============================================================

const UNITS_DATA = [
    // ===================== SECTION 1: FOUNDATIONS =====================
    {
        id: 1,
        title: "Introduction to Computer Systems",
        level: "beginner",
        duration: "45 min",
        sections: [
            {
                title: "What is a Computer?",
                content: `
<p>A <strong>computer</strong> is an electronic device that processes data according to a set of instructions called a <strong>program</strong>. It accepts input, processes it, stores data, and produces output. Understanding this fundamental concept is the first step to mastering computer maintenance and repair.</p>

<div class="info-box note">
<i class="fas fa-info-circle"></i>
<div><strong>Key Concept:</strong> Every computer, from a tiny microcontroller in a washing machine to a massive supercomputer, follows the same basic principle: <strong>Input → Processing → Storage → Output</strong> (IPSO cycle).</div>
</div>

<h3>The IPSO Cycle in Detail</h3>

<p><strong>Input:</strong> Data enters the computer through input devices. This includes keyboards, mice, touchscreens, microphones, scanners, cameras, sensors, and network interfaces. Each input device converts some form of human action or environmental data into electrical signals the computer can understand — specifically, into <strong>binary code</strong> (sequences of 0s and 1s).</p>

<p><strong>Processing:</strong> The Central Processing Unit (CPU) manipulates data according to software instructions. It performs billions of calculations per second, executing arithmetic operations (addition, subtraction, multiplication, division), logical comparisons (equal to, greater than, less than), and data movement operations. The CPU is often called the "brain" of the computer, though this metaphor is imperfect — a CPU doesn't think; it executes instructions mechanically at extraordinary speed.</p>

<p><strong>Storage:</strong> Data is saved in two forms:</p>
<ul>
<li><strong>Primary storage (RAM):</strong> Fast, temporary, volatile memory that holds data currently being used. When power is lost, RAM contents disappear.</li>
<li><strong>Secondary storage (HDD/SSD):</strong> Slower but permanent storage that retains data even when powered off. This includes hard disk drives, solid-state drives, USB flash drives, and optical discs.</li>
</ul>

<p><strong>Output:</strong> Processed data is presented to the user through output devices — monitors, printers, speakers, projectors, and network interfaces. The computer converts its internal binary data back into human-perceivable forms: text, images, sound, printed pages, or network transmissions.</p>

<div class="content-diagram">
<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#6c63ff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#00d4aa;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect x="10" y="70" width="110" height="60" rx="10" fill="#1e1e32" stroke="#6c63ff" stroke-width="2"/>
  <text x="65" y="105" fill="#e8e8f0" text-anchor="middle" font-size="14" font-weight="bold">INPUT</text>
  <rect x="160" y="70" width="110" height="60" rx="10" fill="#1e1e32" stroke="#00d4aa" stroke-width="2"/>
  <text x="215" y="105" fill="#e8e8f0" text-anchor="middle" font-size="14" font-weight="bold">PROCESSING</text>
  <rect x="310" y="70" width="110" height="60" rx="10" fill="#1e1e32" stroke="#ffa726" stroke-width="2"/>
  <text x="365" y="105" fill="#e8e8f0" text-anchor="middle" font-size="14" font-weight="bold">STORAGE</text>
  <rect x="460" y="70" width="110" height="60" rx="10" fill="#1e1e32" stroke="#ff6b6b" stroke-width="2"/>
  <text x="515" y="105" fill="#e8e8f0" text-anchor="middle" font-size="14" font-weight="bold">OUTPUT</text>
  <line x1="120" y1="100" x2="160" y2="100" stroke="#6c63ff" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="270" y1="100" x2="310" y2="100" stroke="#00d4aa" stroke-width="2"/>
  <line x1="420" y1="100" x2="460" y2="100" stroke="#ffa726" stroke-width="2"/>
  <polygon points="158,95 158,105 168,100" fill="#6c63ff"/>
  <polygon points="308,95 308,105 318,100" fill="#00d4aa"/>
  <polygon points="458,95 458,105 468,100" fill="#ffa726"/>
</svg>
<p style="font-size:0.8rem;color:var(--text-muted);margin-top:8px;">Figure 1.1 — The IPSO Cycle (Input → Processing → Storage → Output)</p>
</div>

<h3>Types of Computers</h3>

<p>Computers come in many forms, each designed for specific purposes:</p>

<ul>
<li><strong>Supercomputers:</strong> The most powerful, used for weather forecasting, scientific simulations, cryptanalysis. Examples: Frontier (AMD-based), Fugaku (ARM-based). They cost millions of dollars and fill entire rooms.</li>
<li><strong>Mainframes:</strong> Large, powerful systems used by banks, governments, and airlines to process millions of transactions. IBM is the leading manufacturer. These run 24/7 with 99.999% uptime.</li>
<li><strong>Servers:</strong> Computers that provide services to other computers over a network. Web servers, file servers, database servers, email servers. They typically have redundant components for reliability.</li>
<li><strong>Workstations:</strong> High-performance desktop computers used for engineering, video editing, 3D rendering, and scientific work. They feature professional-grade CPUs (Intel Xeon, AMD Threadripper) and GPU cards (NVIDIA Quadro/RTX).</li>
<li><strong>Desktop Computers:</strong> Personal computers with separate monitor, keyboard, and system unit. Most common type for homes and offices.</li>
<li><strong>Laptop Computers:</strong> Portable all-in-one computers with built-in screen, keyboard, battery, and trackpad. Includes ultrabooks, gaming laptops, and business laptops.</li>
<li><strong>Tablets:</strong> Touchscreen portable computers (iPad, Samsung Galaxy Tab). Limited for repair but increasingly common.</li>
<li><strong>Smartphones:</strong> Pocket-sized computers that also make phone calls. Contains CPU, RAM, storage, camera, GPS, and multiple sensors.</li>
<li><strong>Embedded Systems:</strong> Computers built into other devices — cars, microwaves, medical equipment, industrial robots. Billions of these exist worldwide.</li>
<li><strong>Single-Board Computers:</strong> Small, complete computers on a single circuit board (Raspberry Pi, Arduino). Used for education, prototyping, and IoT projects.</li>
</ul>

<div class="info-box tip">
<i class="fas fa-lightbulb"></i>
<div><strong>Technician's Insight:</strong> As a computer technician, you'll most commonly work on desktops, laptops, and servers. However, understanding all types helps you troubleshoot the underlying principles that apply universally.</div>
</div>
`,
                teacherScript: "Welcome to your first lesson! Today we're starting with the very basics — what a computer actually is and how it works. Don't worry if you've never opened a computer before; we'll take this step by step. A computer is simply an electronic machine that takes in information, does something with it, saves it, and gives you results. Think of it like a very fast, very obedient assistant that follows exact instructions. Let's explore the four stages of how every computer works."
            },
            {
                title: "History and Evolution",
                content: `
<h3>The Journey from Abacus to AI</h3>

<p>Understanding the history of computing helps you appreciate why modern hardware works the way it does, and why repair techniques have evolved.</p>

<p><strong>Ancient Computing (3000 BC – 1800 AD):</strong> The abacus, invented around 3000 BC in Mesopotamia, was the first known calculating device. It uses beads on rods to represent numbers. Remarkably, a skilled abacus user can sometimes perform calculations faster than someone using a basic calculator. Other mechanical calculators followed: Blaise Pascal's Pascaline (1642) could add and subtract; Gottfried Wilhelm Leibniz's Step Reckoner (1694) could also multiply and divide.</p>

<p><strong>Mechanical Era (1800s):</strong> Charles Babbage designed the Difference Engine (1822) and the Analytical Engine (1837) — the latter contained all the essential elements of a modern computer: input, processing, memory, and output. Ada Lovelace wrote what is considered the first computer program for the Analytical Engine, making her the first programmer. Herman Hollerith invented the punch card tabulating machine (1890) to process the US Census — his company eventually became IBM.</p>

<p><strong>First Generation — Vacuum Tubes (1940s–1950s):</strong></p>
<ul>
<li><strong>ENIAC (1945):</strong> First general-purpose electronic computer. Weighed 30 tons, occupied 1,800 square feet, used 18,000 vacuum tubes, consumed 150 kilowatts of power. Required a team of operators to physically rewire it for each new program.</li>
<li><strong>UNIVAC I (1951):</strong> First commercially produced computer. Used for the 1952 presidential election, correctly predicting Eisenhower's landslide victory.</li>
<li><strong>Characteristics:</strong> Enormous size, extreme heat generation, frequent breakdowns (tubes burned out regularly), high power consumption, machine language programming only.</li>
<li><strong>Repair relevance:</strong> Technicians spent hours finding and replacing burned-out vacuum tubes — the origin of the term "debugging" (literal bugs were found inside machines!).</li>
</ul>

<p><strong>Second Generation — Transistors (1950s–1960s):</strong></p>
<ul>
<li>The transistor, invented at Bell Labs in 1947 by Bardeen, Brattain, and Shockley, replaced vacuum tubes.</li>
<li>Computers became smaller, faster, more reliable, and more energy-efficient.</li>
<li>Assembly language and early high-level languages (FORTRAN, COBOL) were developed.</li>
<li>Magnetic core memory replaced mercury delay lines.</li>
<li>Examples: IBM 1401, IBM 7090, CDC 1604.</li>
</ul>

<p><strong>Third Generation — Integrated Circuits (1960s–1970s):</strong></p>
<ul>
<li>Jack Kilby (Texas Instruments) and Robert Noyce (Fairchild Semiconductor) independently invented the integrated circuit (IC) in 1958–1959.</li>
<li>Multiple transistors on a single chip — Small Scale Integration (SSI: up to 100 components), then Medium Scale Integration (MSI: up to 1,000).</li>
<li>Operating systems emerged (OS/360). Time-sharing allowed multiple users simultaneously.</li>
<li>Keyboards and monitors replaced punch cards for input/output.</li>
</ul>

<p><strong>Fourth Generation — Microprocessors (1970s–Present):</strong></p>
<ul>
<li>Intel 4004 (1971): First commercial microprocessor — 2,300 transistors, 740 kHz clock speed.</li>
<li>Intel 8080 (1974): Led to the Altair 8800 and the birth of personal computing.</li>
<li>IBM PC (1981): Standardized personal computing. Used Intel 8088, MS-DOS.</li>
<li>Very Large Scale Integration (VLSI): Millions, then billions of transistors per chip.</li>
<li>Modern example: Apple M2 Ultra has 134 billion transistors. AMD EPYC Genoa has over 90 billion.</li>
</ul>

<p><strong>Fifth Generation — AI and Beyond (Present–Future):</strong></p>
<ul>
<li>Artificial intelligence, machine learning, quantum computing.</li>
<li>Neural processing units (NPUs) integrated into consumer chips.</li>
<li>Cloud computing, edge computing, Internet of Things (IoT).</li>
</ul>

<div class="info-box warning">
<i class="fas fa-exclamation-triangle"></i>
<div><strong>Moore's Law:</strong> Gordon Moore (Intel co-founder) predicted in 1965 that the number of transistors on a chip would double approximately every two years. This "law" held true for over 50 years and drives why computers continually get faster and cheaper. As a technician, this means hardware you learn about today will be significantly more powerful in just a few years — continuous learning is essential.</div>
</div>
`,
                teacherScript: "Now let's take a fascinating journey through computing history. Understanding where we came from helps us understand why today's computers work the way they do. The first computers were enormous — as big as a room — and they broke down constantly because of vacuum tubes that burned out like light bulbs. Imagine having to find one bad tube among eighteen thousand! That's what early computer technicians did. Let's see how we got from those room-sized machines to the powerful smartphones in our pockets."
            },
            {
                title: "Computer Hardware vs Software",
                content: `
<h3>The Two Fundamental Categories</h3>

<p>Everything about a computer falls into one of two categories: <strong>hardware</strong> or <strong>software</strong>. As a repair technician, you'll work primarily with hardware, but understanding software is equally important because many "hardware problems" are actually software issues.</p>

<h4>Hardware — The Physical Components</h4>
<p><strong>Hardware</strong> refers to any physical component of a computer system — anything you can touch, see, and physically hold. Hardware degrades over time due to heat, vibration, dust, moisture, electrical surges, and mechanical wear.</p>

<p>Major hardware categories include:</p>
<ul>
<li><strong>Processing hardware:</strong> CPU (Central Processing Unit), GPU (Graphics Processing Unit), NPU (Neural Processing Unit)</li>
<li><strong>Memory hardware:</strong> RAM modules (DDR4, DDR5), cache memory (built into CPU)</li>
<li><strong>Storage hardware:</strong> HDD, SSD (SATA, NVMe), optical drives, USB drives, memory cards</li>
<li><strong>Input hardware:</strong> Keyboard, mouse, scanner, microphone, webcam, touchscreen, gamepad</li>
<li><strong>Output hardware:</strong> Monitor, printer, speakers, headphones, projector</li>
<li><strong>Communication hardware:</strong> Network interface card (NIC), Wi-Fi adapter, Bluetooth adapter, modem</li>
<li><strong>Power hardware:</strong> Power supply unit (PSU), UPS (Uninterruptible Power Supply), voltage regulators</li>
<li><strong>Structural hardware:</strong> Motherboard, case/chassis, cables, connectors, cooling systems (fans, heatsinks, liquid cooling)</li>
</ul>

<h4>Software — The Instructions</h4>
<p><strong>Software</strong> is a set of instructions that tells the hardware what to do. Software exists as data stored in memory or storage devices — it has no physical form.</p>

<p>Software categories:</p>
<ul>
<li><strong>System software:</strong>
    <ul>
        <li><strong>Operating Systems:</strong> Windows, macOS, Linux, Chrome OS — manages hardware resources and provides the platform for applications</li>
        <li><strong>Device Drivers:</strong> Software that allows the OS to communicate with specific hardware (graphics drivers, printer drivers, network drivers)</li>
        <li><strong>Firmware:</strong> Software embedded in hardware chips (BIOS/UEFI, router firmware, SSD controller firmware)</li>
        <li><strong>Utility Software:</strong> Disk defragmenters, antivirus, backup software, file compression tools</li>
    </ul>
</li>
<li><strong>Application software:</strong>
    <ul>
        <li>Productivity: Microsoft Office, Google Workspace, LibreOffice</li>
        <li>Creative: Adobe Photoshop, Premiere Pro, Blender</li>
        <li>Communication: Email clients, web browsers, video conferencing</li>
        <li>Entertainment: Games, media players, streaming apps</li>
        <li>Specialized: Accounting software, CAD/CAM, medical imaging</li>
    </ul>
</li>
</ul>

<div class="key-terms">
    <div class="key-term">
        <strong>Firmware</strong>
        <p>A special type of software permanently stored on a hardware chip. It's the bridge between hardware and software — it provides low-level control of the device. Examples: BIOS, UEFI, router firmware, printer firmware.</p>
    </div>
    <div class="key-term">
        <strong>Device Driver</strong>
        <p>Software that acts as a translator between the operating system and a piece of hardware. Without the correct driver, the OS cannot communicate with the hardware device.</p>
    </div>
    <div class="key-term">
        <strong>BIOS/UEFI</strong>
        <p>Basic Input/Output System (legacy) or Unified Extensible Firmware Interface (modern). The first software that runs when you power on a computer. It initializes hardware and starts the boot process.</p>
    </div>
    <div class="key-term">
        <strong>Volatile Memory</strong>
        <p>Memory that loses its contents when power is removed. RAM is volatile — this is why unsaved work is lost during a power outage.</p>
    </div>
</div>

<div class="info-box tip">
<i class="fas fa-lightbulb"></i>
<div><strong>Diagnostic Tip:</strong> When troubleshooting, always determine whether a problem is hardware or software related. The approach differs completely:
<br>• <strong>Hardware:</strong> Physical repair, replacement, cleaning, thermal paste reapplication
<br>• <strong>Software:</strong> Driver updates, OS reinstallation, virus removal, configuration changes
<br>• <strong>Firmware:</strong> BIOS/UEFI updates (be extremely careful — failed firmware updates can brick a device)</div>
</div>
`,
                teacherScript: "Now here's something really important — the difference between hardware and software. Hardware is everything you can physically touch: the keyboard, the screen, the chips inside. Software is the invisible instructions that tell the hardware what to do. Think of it this way: hardware is like a musical instrument, and software is like the sheet music. Both are needed to make music. As a technician, you need to know both, because sometimes what looks like a hardware problem is actually a software issue, and vice versa."
            },
            {
                title: "Safety Fundamentals",
                content: `
<h3>Electrical Safety and ESD Protection</h3>

<div class="info-box danger">
<i class="fas fa-bolt"></i>
<div><strong>CRITICAL SAFETY WARNING:</strong> Before touching any computer hardware, you MUST understand electrical safety and ESD (Electrostatic Discharge) protection. Failure to follow safety procedures can result in:
<br>• <strong>Personal injury or death</strong> from electric shock (CRT monitors and power supplies contain lethal voltages)
<br>• <strong>Permanent hardware damage</strong> from ESD (invisible static electricity that destroys sensitive chips)
<br>• <strong>Fire hazard</strong> from short circuits or overloaded power supplies</div>
</div>

<h4>Electrostatic Discharge (ESD)</h4>
<p>ESD is the sudden flow of electricity between two objects when they come into contact. You've experienced it when you touch a doorknob after walking across carpet and feel a shock. That shock can be 3,000–25,000 volts! While not dangerous to humans, electronic components can be damaged by as little as <strong>30 volts</strong> — far below what you can feel.</p>

<p><strong>ESD damage can be:</strong></p>
<ul>
<li><strong>Catastrophic:</strong> The component fails immediately and completely. Easy to diagnose.</li>
<li><strong>Latent (Upset):</strong> The component is weakened but continues to function. It may fail days, weeks, or months later, causing intermittent and frustrating problems that are extremely difficult to diagnose. This is more common and more dangerous than catastrophic failure.</li>
</ul>

<h4>ESD Prevention Measures</h4>

<div class="practical-step">
    <div class="step-number">1</div>
    <div class="step-content">
        <strong>Anti-Static Wrist Strap</strong>
        <p>Wear an anti-static (ESD) wrist strap connected to a grounded point. The strap contains a 1-megohm resistor that safely bleeds static charge from your body to ground without risk of shock. This is your MOST important ESD protection tool. Never work inside a computer without one.</p>
    </div>
</div>

<div class="practical-step">
    <div class="step-number">2</div>
    <div class="step-content">
        <strong>Anti-Static Mat</strong>
        <p>Work on an anti-static mat that is also grounded. Place components on this mat when removed from the computer. Never place components on carpet, clothing, or untreated surfaces.</p>
    </div>
</div>

<div class="practical-step">
    <div class="step-number">3</div>
    <div class="step-content">
        <strong>Anti-Static Bags</strong>
        <p>Store and transport sensitive components in anti-static bags (the silvery/pink bags that new components come in). Never store components in regular plastic bags — regular plastic generates static.</p>
    </div>
</div>

<div class="practical-step">
    <div class="step-number">4</div>
    <div class="step-content">
        <strong>Environmental Controls</strong>
        <p>Maintain humidity between 40-60%. Low humidity increases static buildup. Avoid working on carpet. Wear natural fiber clothing (cotton) rather than synthetic (polyester, nylon) which generates more static. Remove jewelry that could create shorts.</p>
    </div>
</div>

<div class="practical-step">
    <div class="step-number">5</div>
    <div class="step-content">
        <strong>Self-Grounding</strong>
        <p>If no wrist strap is available, frequently touch an unpainted metal part of the computer case that is plugged in (but powered off). This equalizes your charge with the case. This is NOT as reliable as a wrist strap but better than nothing.</p>
    </div>
</div>

<h4>Electrical Safety Rules</h4>
<ul>
<li><strong>NEVER</strong> open a CRT monitor or power supply unless specifically trained. They contain capacitors that hold lethal voltage even when unplugged for days.</li>
<li>Always unplug the computer before opening the case (for ESD protection, keep it plugged in but switched OFF at the PSU — the ground wire remains connected).</li>
<li>Never work with wet hands or in damp conditions.</li>
<li>Use a surge protector or UPS to protect equipment from power spikes.</li>
<li>Follow lockout/tagout procedures in enterprise environments.</li>
<li>Know the location of the nearest fire extinguisher rated for electrical fires (Class C in US, Class E in some countries).</li>
<li>If someone is being electrocuted, do NOT touch them directly. Disconnect power at the source, or use a non-conductive object to separate them from the source.</li>
</ul>

<h4>Physical Safety</h4>
<ul>
<li>Lift heavy equipment (servers, UPS units, CRT monitors) using proper technique — bend at the knees, keep your back straight.</li>
<li>Be careful of sharp edges inside computer cases — sheet metal can cause deep cuts.</li>
<li>Laser printers contain a fuser unit that reaches temperatures of 200°C (400°F). Allow it to cool before servicing.</li>
<li>Dispose of batteries (especially lithium-ion) properly — they can catch fire or explode if damaged.</li>
<li>CRT monitors contain lead; dispose of through proper e-waste recycling channels.</li>
<li>Toner powder is a fine particle irritant — avoid breathing it in. Use proper toner vacuum with HEPA filter.</li>
</ul>
`,
                teacherScript: "Stop! Before we go any further, we need to talk about safety. This is the most important lesson in this entire course. Working inside computers can be dangerous if you don't follow proper procedures. There are two main risks: electrical shock, which can injure or kill you, and static electricity, which is invisible but can destroy expensive components. I'm going to teach you how to protect yourself and the equipment. Always remember: no repair is worth risking your safety."
            }
        ],
        test: {
            questions: [
                {
                    type: "mcq",
                    text: "What are the four stages of the IPSO cycle?",
                    options: ["Input, Processing, Storage, Output", "Install, Program, Save, Open", "Input, Print, Store, Output", "Initiate, Process, Send, Operate"],
                    correct: 0,
                    explanation: "IPSO stands for Input, Processing, Storage, Output — the fundamental cycle of how all computers work."
                },
                {
                    type: "mcq",
                    text: "Which generation of computers used vacuum tubes?",
                    options: ["Second generation", "Third generation", "First generation", "Fourth generation"],
                    correct: 2,
                    explanation: "First generation computers (1940s-1950s) used vacuum tubes. They were large, generated lots of heat, and broke down frequently."
                },
                {
                    type: "mcq",
                    text: "What is the minimum voltage that can damage electronic components through ESD?",
                    options: ["100 volts", "1,000 volts", "30 volts", "500 volts"],
                    correct: 2,
                    explanation: "Electronic components can be damaged by as little as 30 volts of static electricity, far below what humans can feel (about 3,000 volts)."
                },
                {
                    type: "mcq",
                    text: "What type of memory loses its contents when power is removed?",
                    options: ["ROM", "SSD", "Volatile memory (RAM)", "Hard disk"],
                    correct: 2,
                    explanation: "RAM (Random Access Memory) is volatile — it requires constant power to maintain its contents."
                },
                {
                    type: "tf",
                    text: "Firmware is a type of software that is permanently stored on a hardware chip.",
                    correct: true,
                    explanation: "Firmware is indeed software stored on hardware chips (like BIOS/UEFI on a motherboard). It bridges the gap between hardware and software."
                },
                {
                    type: "tf",
                    text: "It is safe to open a CRT monitor if the power cable is unplugged.",
                    correct: false,
                    explanation: "NEVER open a CRT monitor without specialized training. CRT monitors contain capacitors that can hold lethal voltage for days or even weeks after being unplugged."
                },
                {
                    type: "mcq",
                    text: "What does a 1-megohm resistor in an anti-static wrist strap do?",
                    options: [
                        "Blocks all electricity from flowing",
                        "Safely bleeds static charge to ground without risk of shock",
                        "Increases the static charge for testing",
                        "Powers the wrist strap indicator light"
                    ],
                    correct: 1,
                    explanation: "The 1MΩ resistor in an ESD wrist strap limits the discharge rate, safely bleeding static to ground while preventing a dangerous current flow if you accidentally touch a live circuit."
                }
            ],
            passingScore: 70,
            timeLimit: 30
        },
        glossary: [
            { term: "CPU", definition: "Central Processing Unit — the primary processor that executes program instructions. Often called the 'brain' of the computer." },
            { term: "RAM", definition: "Random Access Memory — fast, volatile memory used for temporary data storage during active computing." },
            { term: "ESD", definition: "Electrostatic Discharge — the sudden flow of static electricity between objects, capable of damaging electronic components." },
            { term: "IPSO", definition: "Input, Processing, Storage, Output — the fundamental cycle of computer operation." },
            { term: "BIOS", definition: "Basic Input/Output System — legacy firmware that initializes hardware during boot. Being replaced by UEFI." },
            { term: "UEFI", definition: "Unified Extensible Firmware Interface — modern replacement for BIOS with graphical interface and advanced features." },
            { term: "Firmware", definition: "Software permanently stored on a hardware chip that provides low-level device control." },
            { term: "Volatile", definition: "Describes memory that loses data when power is removed. RAM is volatile; flash storage is non-volatile." },
            { term: "Motherboard", definition: "The main circuit board that connects and allows communication between all computer components." },
            { term: "PSU", definition: "Power Supply Unit — converts AC power from the wall outlet to DC power used by computer components." }
        ],
        labConfig: {
            device: "desktop",
            tasks: [
                "Identify the power supply unit",
                "Locate the CPU on the motherboard",
                "Find all RAM slots",
                "Identify the PCIe x16 slot for graphics cards",
                "Locate the SATA connectors for storage drives",
                "Find the 24-pin motherboard power connector"
            ]
        }
    },

    // UNIT 2
    {
        id: 2,
        title: "Number Systems and Data Representation",
        level: "beginner",
        duration: "40 min",
        sections: [
            {
                title: "Binary Number System",
                content: `
<p>Computers operate using the <strong>binary number system</strong> (base-2), which uses only two digits: <strong>0</strong> and <strong>1</strong>. Every piece of data in a computer — text, images, sound, video, programs — is ultimately stored and processed as sequences of binary digits (bits).</p>

<h3>Why Binary?</h3>
<p>Electronic circuits have two natural states:</p>
<ul>
<li><strong>ON (1):</strong> High voltage (typically 3.3V or 5V), current flowing, capacitor charged, magnetic field present</li>
<li><strong>OFF (0):</strong> Low voltage (0V or near 0V), no current, capacitor discharged, no magnetic field</li>
</ul>
<p>Binary is the most reliable way to represent data electronically because distinguishing between two states is far easier and more noise-resistant than distinguishing between ten states (as decimal would require).</p>

<h3>Counting in Binary</h3>
<p>In decimal (base-10), each position is a power of 10:</p>
<pre><code>Units (10⁰=1), Tens (10¹=10), Hundreds (10²=100), Thousands (10³=1000)...</code></pre>

<p>In binary (base-2), each position is a power of 2:</p>
<pre><code>Position:  7    6    5    4    3    2    1    0
Power:     2⁷   2⁶   2⁵   2⁴   2³   2²   2¹   2⁰
Value:     128  64   32   16   8    4    2    1</code></pre>

<p><strong>Example:</strong> Binary 10110101 = ?</p>
<pre><code>1×128 + 0×64 + 1×32 + 1×16 + 0×8 + 1×4 + 0×2 + 1×1
= 128 + 0 + 32 + 16 + 0 + 4 + 0 + 1
= 181 in decimal</code></pre>

<h3>Data Units</h3>
<div class="key-terms">
<div class="key-term"><strong>Bit (b)</strong><p>Single binary digit: 0 or 1. The smallest unit of data.</p></div>
<div class="key-term"><strong>Nibble</strong><p>4 bits. Can represent 0-15 (one hexadecimal digit).</p></div>
<div class="key-term"><strong>Byte (B)</strong><p>8 bits. Can represent 0-255. The fundamental unit of storage.</p></div>
<div class="key-term"><strong>Kilobyte (KB)</strong><p>1,024 bytes (2¹⁰). A short email is about 2 KB.</p></div>
<div class="key-term"><strong>Megabyte (MB)</strong><p>1,024 KB = 1,048,576 bytes (2²⁰). An MP3 song is about 3-5 MB.</p></div>
<div class="key-term"><strong>Gigabyte (GB)</strong><p>1,024 MB. A DVD movie is about 4.7 GB. Typical RAM: 8-32 GB.</p></div>
<div class="key-term"><strong>Terabyte (TB)</strong><p>1,024 GB. Common HDD/SSD sizes: 1-4 TB.</p></div>
<div class="key-term"><strong>Petabyte (PB)</strong><p>1,024 TB. Used in data centers and enterprise storage.</p></div>
</div>
`,
                teacherScript: "Computers only understand two things: on and off, which we represent as 1 and 0. This is the binary number system, and it's the foundation of everything digital. I know math might not be everyone's favorite subject, but I promise this is practical knowledge. Understanding binary helps you read memory addresses, understand storage capacities, and diagnose data problems."
            },
            {
                title: "Hexadecimal and Octal Systems",
                content: `
<h3>Hexadecimal (Base-16)</h3>
<p>Hexadecimal uses 16 symbols: 0-9 and A-F (where A=10, B=11, C=12, D=13, E=14, F=15). It's extensively used in computing because:</p>
<ul>
<li>One hex digit represents exactly 4 bits (one nibble)</li>
<li>Two hex digits represent one byte (8 bits)</li>
<li>It's much more compact and readable than binary</li>
</ul>

<p>You'll encounter hexadecimal in:</p>
<ul>
<li><strong>Memory addresses:</strong> 0x7FFF0000, 0xDEADBEEF</li>
<li><strong>MAC addresses:</strong> AA:BB:CC:DD:EE:FF</li>
<li><strong>Color codes:</strong> #FF6B6B (red), #00D4AA (green)</li>
<li><strong>Error codes:</strong> STOP 0x0000007E (BSOD codes)</li>
<li><strong>Disk editors:</strong> When examining raw disk data</li>
<li><strong>Assembly language:</strong> Machine code representation</li>
</ul>

<p><strong>Binary to Hex Conversion:</strong> Group binary digits into sets of 4, starting from the right:</p>
<pre><code>Binary:   1101  0110  1010  0011
Hex:        D     6     A     3
Result: 0xD6A3</code></pre>

<h3>Practical Application: Reading a Blue Screen Error</h3>
<p>When Windows crashes (Blue Screen of Death / BSOD), it displays error codes in hexadecimal:</p>
<pre><code>STOP: 0x0000000A (0x00000000, 0x00000002, 0x00000000, 0x804E3B4C)
IRQL_NOT_LESS_OR_EQUAL</code></pre>
<p>Understanding hex helps you look up these codes and determine whether the crash is caused by a driver, hardware failure, or memory corruption.</p>
`,
                teacherScript: "Now let's learn hexadecimal — that's the base-16 number system. Don't worry, it's simpler than it sounds! You'll use hexadecimal constantly as a technician. When Windows shows you a blue screen error code like 0x0000007E, that's hexadecimal. When you look at a network adapter's MAC address, that's hexadecimal too."
            }
        ],
        test: {
            questions: [
                { type: "mcq", text: "Convert binary 11001010 to decimal.", options: ["192", "202", "210", "182"], correct: 1, explanation: "128+64+0+0+8+0+2+0 = 202" },
                { type: "mcq", text: "How many bytes are in a Kilobyte (in computing)?", options: ["1,000", "1,024", "1,048", "10,000"], correct: 1, explanation: "In computing, 1 KB = 2^10 = 1,024 bytes." },
                { type: "mcq", text: "What is the hexadecimal equivalent of binary 11111111?", options: ["EE", "FF", "FE", "EF"], correct: 1, explanation: "1111 = F in hex, so 11111111 = FF. In decimal, this is 255." },
                { type: "tf", text: "A nibble consists of 8 bits.", correct: false, explanation: "A nibble is 4 bits (half a byte)." },
                { type: "mcq", text: "What number system is commonly used for MAC addresses?", options: ["Binary", "Decimal", "Hexadecimal", "Octal"], correct: 2, explanation: "MAC addresses use hexadecimal notation, e.g., AA:BB:CC:DD:EE:FF" }
            ],
            passingScore: 70,
            timeLimit: 20
        },
        glossary: [
            { term: "Binary", definition: "Base-2 number system using only 0 and 1." },
            { term: "Hexadecimal", definition: "Base-16 number system using 0-9 and A-F." },
            { term: "Bit", definition: "Binary digit — the smallest unit of computer data." },
            { term: "Byte", definition: "8 bits — the fundamental unit of computer storage." },
            { term: "BSOD", definition: "Blue Screen of Death — a Windows stop error indicating a critical system failure." },
            { term: "MAC Address", definition: "Media Access Control address — a unique 48-bit hardware identifier for network interfaces." }
        ]
    },

    // Placeholder for units 3-120
    { id: 3, title: "Inside the Computer Case — Identifying Components", level: "beginner", duration: "50 min", sections: [{ title: "Opening the Case Safely", content: "<p>Detailed content about opening different case types, tool requirements, ESD precautions in practice...</p>", teacherScript: "Time to get our hands dirty!" }], test: { questions: [{ type: "mcq", text: "What tool is most commonly used to open a computer case?", options: ["Flathead screwdriver", "Phillips #2 screwdriver", "Allen key", "Torx T15"], correct: 1, explanation: "Most PC cases use Phillips #2 screws." }], passingScore: 70, timeLimit: 20 } },
    { id: 4, title: "The Motherboard — Heart of the System", level: "beginner", duration: "60 min", sections: [], test: { questions: [], passingScore: 70, timeLimit: 25 } },
    { id: 5, title: "Central Processing Unit (CPU) — The Brain", level: "beginner", duration: "55 min", sections: [], test: { questions: [], passingScore: 70, timeLimit: 25 } },
    { id: 6, title: "Memory (RAM) — Fast Temporary Storage", level: "beginner", duration: "45 min", sections: [], test: { questions: [], passingScore: 70, timeLimit: 20 } },
    { id: 7, title: "Storage Devices — HDDs and SSDs", level: "beginner", duration: "60 min", sections: [], test: { questions: [], passingScore: 70, timeLimit: 25 } },
    { id: 8, title: "Power Supply Unit (PSU)", level: "beginner", duration: "50 min", sections: [], test: { questions: [], passingScore: 70, timeLimit: 25 } },
    { id: 9, title: "Graphics Processing Unit (GPU)", level: "beginner", duration: "45 min", sections: [], test: { questions: [], passingScore: 70, timeLimit: 20 } },
    { id: 10, title: "Cooling Systems — Keeping Components Alive", level: "beginner", duration: "40 min", sections: [], test: { questions: [], passingScore: 70, timeLimit: 20 } }
];

// Fill in the rest of the 120 units with placeholders
for (let i = 11; i <= 120; i++) {
    UNITS_DATA.push({
        id: i,
        title: `Unit ${i}: Advanced Topic Placeholder`,
        level: i < 40 ? "beginner" : i < 80 ? "intermediate" : i < 110 ? "advanced" : "professional",
        duration: "45 min",
        sections: [],
        test: { questions: [], passingScore: 70, timeLimit: 20 }
    });
}

// Global glossary combining all unit glossaries
const GLOBAL_GLOSSARY = [];
UNITS_DATA.forEach(unit => {
    if (unit.glossary) {
        unit.glossary.forEach(item => {
            if (!GLOBAL_GLOSSARY.find(g => g.term === item.term)) {
                GLOBAL_GLOSSARY.push(item);
            }
        });
    }
});
GLOBAL_GLOSSARY.sort((a, b) => a.term.localeCompare(b.term));

// Achievements system
const ACHIEVEMENTS = [
    { id: "first_unit", icon: "🎯", name: "First Steps", desc: "Complete your first unit", xp: 50 },
    { id: "five_units", icon: "📚", name: "Bookworm", desc: "Complete 5 units", xp: 100 },
    { id: "ten_units", icon: "🔟", name: "Dedicated Learner", desc: "Complete 10 units", xp: 200 },
    { id: "perfect_test", icon: "💯", name: "Perfect Score", desc: "Score 100% on any test", xp: 150 },
    { id: "streak_3", icon: "🔥", name: "On Fire", desc: "3-day study streak", xp: 100 },
    { id: "graduate", icon: "🎓", name: "Graduate", desc: "Complete all 120 units", xp: 1000 }
];

const RANKS = [
    { name: "Novice", minXp: 0, icon: "🔰" },
    { name: "Apprentice", minXp: 200, icon: "🔧" },
    { name: "Technician", minXp: 500, icon: "⚙️" },
    { name: "Specialist", minXp: 1200, icon: "🛠️" },
    { name: "Expert", minXp: 2500, icon: "💻" },
    { name: "Master Technician", minXp: 6000, icon: "🏆" }
];
