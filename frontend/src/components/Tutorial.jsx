import { useState, useEffect } from "react";

export default function Tutorial({ onComplete }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Check if tutorial was already completed
        const completed = localStorage.getItem("sudoku-tutorial-completed");
        if (completed) {
            setIsVisible(false);
        }
    }, []);

    const steps = [
        {
            title: "Welcome to Sudoku!",
            content: "Fill the 9×9 grid with numbers 1-9. Each row, column, and 3×3 box must contain all digits without repetition.",
            target: null,
        },
        {
            title: "Select a Cell",
            content: "Click any empty cell to select it. Use arrow keys or click to navigate between cells.",
            target: ".sudoku-grid",
        },
        {
            title: "Enter Numbers",
            content: "Click the number buttons below or press 1-9 on your keyboard to fill the selected cell.",
            target: ".number-buttons",
        },
        {
            title: "Pencil Mode",
            content: "Enable pencil mode to write small candidate numbers in cells. This helps track possibilities!",
            target: ".pencil-button",
        },
        {
            title: "Use Hints Wisely",
            content: "Stuck? Use a hint to reveal the correct number for the selected cell. You get 3 hints per game.",
            target: ".hint-button",
        },
        {
            title: "Avoid Mistakes",
            content: "You're allowed 3 mistakes. Wrong answers will be highlighted in red and shake the grid!",
            target: ".mistakes-display",
        },
        {
            title: "Ready to Play!",
            content: "Start with Easy puzzles and work your way up. Good luck!",
            target: null,
        },
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            completeTutorial();
        }
    };

    const handleSkip = () => {
        completeTutorial();
    };

    const completeTutorial = () => {
        localStorage.setItem("sudoku-tutorial-completed", "true");
        setIsVisible(false);
        if (onComplete) onComplete();
    };

    if (!isVisible) return null;

    const step = steps[currentStep];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
                    <button
                        onClick={handleSkip}
                        className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                        Skip Tutorial
                    </button>
                </div>

                {/* Progress */}
                <div className="flex gap-1 mb-4">
                    {steps.map((_, index) => (
                        <div
                            key={index}
                            className={`flex-1 h-2 rounded ${index <= currentStep ? "bg-blue-600" : "bg-gray-300"
                                }`}
                        />
                    ))}
                </div>

                {/* Content */}
                <div className="mb-6">
                    <p className="text-gray-700 text-lg">{step.content}</p>
                </div>

                {/* Navigation */}
                <div className="flex gap-3">
                    {currentStep > 0 && (
                        <button
                            onClick={() => setCurrentStep(currentStep - 1)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                            ← Back
                        </button>
                    )}
                    <button
                        onClick={handleNext}
                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                    >
                        {currentStep === steps.length - 1 ? "Start Playing!" : "Next →"}
                    </button>
                </div>

                {/* Step indicator */}
                <div className="text-center mt-4 text-sm text-gray-500">
                    Step {currentStep + 1} of {steps.length}
                </div>
            </div>
        </div>
    );
}
