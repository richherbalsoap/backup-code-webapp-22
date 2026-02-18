import React from 'react';

const GoldenBackground = () => {
  return (
    <>
      <style>
        {`
          .golden-falling-line {
            position: absolute;
            top: -150px;
            width: 1px;
            height: 300px;
            background: linear-gradient(to bottom, transparent, rgba(255, 215, 0, 0.6), transparent);
            animation: goldenFall linear infinite;
            opacity: 0;
            box-shadow: 0 0 6px rgba(255, 215, 0, 0.2);
            will-change: transform, opacity;
          }
          .golden-falling-line::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 2px;
            height: 40px;
            background: rgba(255, 255, 255, 0.8);
            opacity: 0.5;
            box-shadow: 0 0 8px rgba(255, 215, 0, 0.4);
          }
          @keyframes goldenFall {
            0% { transform: translateY(-300px); opacity: 0; }
            10% { opacity: 0.7; }
            90% { opacity: 0.7; }
            100% { transform: translateY(120vh); opacity: 0; }
          }
          .golden-grid-bg {
            background-size: 40px 40px;
            background-image: linear-gradient(to right, rgba(255, 215, 0, 0.03) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255, 215, 0, 0.03) 1px, transparent 1px);
            mask-image: linear-gradient(to bottom, black 30%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, black 30%, transparent 100%);
          }
          .golden-horizon-ring {
            width: 150vw;
            height: 150vw;
            border-radius: 50%;
            border: 1px solid rgba(255, 215, 0, 0.05);
            position: absolute;
            left: 50%;
            bottom: -130vw;
            transform: translateX(-50%);
            box-shadow: 0 -20px 60px -20px rgba(255, 215, 0, 0.15);
            z-index: 1;
            pointer-events: none;
          }
        `}
      </style>
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute inset-0 golden-grid-bg opacity-15"></div>
        <div className="absolute inset-0">
          {[10, 25, 45, 70, 85, 35, 60].map((left, i) => (
            <div
              key={i}
              className="golden-falling-line"
              style={{
                left: `${left}%`,
                animationDuration: `${4 + (i % 3) * 1.5}s`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent"></div>
        <div className="golden-horizon-ring"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[200px] bg-[#FFD700]/5 blur-[60px] rounded-full"></div>
      </div>
    </>
  );
};

export default React.memo(GoldenBackground);
