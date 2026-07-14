import React from "react";

const AboutPage = () => {
  return (
    <div className="w-full min-h-screen bg-white text-neutral-900 py-16 md:py-28 px-6 md:px-12 selection:bg-neutral-100">
      <div className="max-w-4xl mx-auto space-y-16 md:space-y-24">
        
        {/* 1. Header Area: Ultra Minimal */}
        <div className="space-y-6">
          <p className="text-xs tracking-[0.2em] text-neutral-400 uppercase font-medium">
            About the platform
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-neutral-900 leading-[1.1]">
            TechfoAnalyzer is an independent journal dedicated to tracking <span className="font-normal text-neutral-900">computing, security, and intelligence</span>.
          </h1>
        </div>

        {/* 2. Divider Line */}
        <hr className="border-neutral-100" />

        {/* 3. Narrative Layout (Two-column split, no cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          <div className="md:col-span-1">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
              Our Scope
            </h2>
          </div>
          
          <div className="md:col-span-2 space-y-6 text-neutral-600 leading-relaxed text-base md:text-lg">
            <p>
              We analyze the technical forces shaping our world. Our writing spans computer science theory, systems architecture, artificial intelligence, ethical hacking, and cybersecurity infrastructure.
            </p>
            <p>
              At TechfoAnalyzer, we avoid sensationalism, industry hype, and corporate PR. We believe technical concepts deserve rigorous, clear, and objective analysis.
            </p>
          </div>

        </div>

        {/* 4. Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-8">
          
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
              Niches
            </h2>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>• Computer Science</li>
              <li>• Cybersecurity & Hacking</li>
              <li>• Artificial Intelligence</li>
              <li>• Systems Engineering</li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
              Focus
            </h2>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>• Deep Technical Analysis</li>
              <li>• Practical Frameworks</li>
              <li>• 0% Corporate Noise</li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
              Contact
            </h2>
            <p className="text-sm text-neutral-600 mb-4">
              press@techfoanalyzer.com
            </p>
            <a 
              href="mailto:press@techfoanalyzer.com" 
              className="text-sm font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-500 transition-colors"
            >
              Get in touch →
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AboutPage;