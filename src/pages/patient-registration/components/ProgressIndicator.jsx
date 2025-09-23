import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="bg-card border-b p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="hidden md:flex items-center justify-between">
          {steps?.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            const isUpcoming = stepNumber > currentStep;

            return (
              <div key={step?.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all
                    ${isCompleted 
                      ? 'bg-success border-success text-success-foreground' 
                      : isCurrent 
                        ? 'bg-primary border-primary text-primary-foreground' 
                        : 'bg-muted border-muted-foreground/30 text-muted-foreground'
                    }
                  `}>
                    {isCompleted ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <span className="text-sm font-medium">{stepNumber}</span>
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p className={`text-sm font-medium ${
                      isCurrent ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {step?.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 max-w-24">
                      {step?.description}
                    </p>
                  </div>
                </div>
                {index < steps?.length - 1 && (
                  <div className={`
                    flex-1 h-0.5 mx-4 mt-5 transition-all
                    ${stepNumber < currentStep ? 'bg-success' : 'bg-muted'}
                  `} />
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Progress */}
        <div className="md:hidden">
          <div className="flex items-center space-x-3">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center border-2
              bg-primary border-primary text-primary-foreground
            `}>
              <span className="text-sm font-medium">{currentStep}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-primary">
                {steps?.[currentStep - 1]?.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {steps?.[currentStep - 1]?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;