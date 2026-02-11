import React from 'react';

// ─── TYPES ─────────────────────────────────────────────────────────────────────

export interface StepperProps {
  steps: number;
  currentStep: number;
  className?: string;
}

export interface StepperWithLabelsProps {
  steps: { label: string; description?: string }[];
  currentStep: number;
  className?: string;
}

// ─── PROGRESS STEPPER ──────────────────────────────────────────────────────────

export function Stepper({ steps, currentStep, className = '' }: StepperProps) {
  const progress = Math.min(Math.max(currentStep / steps, 0), 1);

  return (
    <div className={['w-full', className].join(' ')}>
      <div className="relative w-full h-[5px] bg-grey-50 rounded-xs overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-primary-500 rounded-xs transition-all duration-300 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}

// ─── STEP INDICATOR ────────────────────────────────────────────────────────────

export function StepperWithLabels({ steps, currentStep, className = '' }: StepperWithLabelsProps) {
  return (
    <div className={['w-full', className].join(' ')}>
      <div className="flex items-center">
        {steps.map((step, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div
                  className={[
                    'flex items-center justify-center w-8 h-8 rounded-full text-ds-sm font-semibold transition-colors duration-200',
                    isCompleted
                      ? 'bg-primary-500 text-white'
                      : isCurrent
                        ? 'bg-primary-500 text-white'
                        : 'bg-grey-50 text-grey-300',
                  ].join(' ')}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stepNum
                  )}
                </div>

                <span
                  className={[
                    'mt-2 text-ds-xs font-medium text-center max-w-[80px]',
                    isCurrent ? 'text-grey-500' : 'text-grey-300',
                  ].join(' ')}
                >
                  {step.label}
                </span>

                {step.description && (
                  <span className="text-[10px] text-grey-200 text-center max-w-[80px]">
                    {step.description}
                  </span>
                )}
              </div>

              {!isLast && (
                <div className="flex-1 mx-2 mt-[-20px]">
                  <div className="h-[5px] bg-grey-50 rounded-xs">
                    <div
                      className={[
                        'h-full bg-primary-500 rounded-xs transition-all duration-300',
                        isCompleted ? 'w-full' : 'w-0',
                      ].join(' ')}
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
