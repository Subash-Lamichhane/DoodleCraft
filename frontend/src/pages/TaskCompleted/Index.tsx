import Footer from "../../components/Footer";
import Header from "../../components/Header";

interface MilestoneProps {
    title: string;
    description: string;
}

export default function TaskCompleted() {
    const completedTasks: MilestoneProps[] = [
        {
            title: "Requirement Analysis",
            description: "Research on GAN and ControlNet",
        },
        {
            title: "Initial Training",
            description: "Train GAN on Anime, Building and Shoes dataset",
        },
        {
            title: "Evaluation and Presentation",
            description: "Evaluate the model and present the result",
        },
        {
            title: "Research",
            description: "Research works done on ControlNet and dataset availability",
        },
        {
            title: "Training",
            description: "Train ControlNet on fashion dataset",
        },
        {
            title: "Development",
            description: "Develop the web application",
        },
        {
            title: "Final Training",
            description: "Train GAN and ControlNet on the final dataset",
        },
        {
            title: "Testing",
            description: "Test the model on the final dataset",
        },
    ];

    const remainingTasks: MilestoneProps[] = [

        {
            title: "Deployment and documentation",
            description: "Deploy the model and web application and document the project",
        },
    ];

    return (
        <div className="bg-[#0a192f] text-white ">
            <Header/>
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-1 lg:px-16 mb-14">
            {timeline(completedTasks, true)}
            {timeline(remainingTasks, false)}
        </div>
        <Footer/>
        </div>
    );
}

const timeline = (milestones: MilestoneProps[], isCompleted: boolean) => {
    return (
        <div className=" bg-[#0a192f] p-2 md:p-8">
            <h1 className="text-white mb-4 text-center text-3xl font-bold">{isCompleted?"Task Completed":"Task remaining"}</h1>
            <div className=" mx-auto relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px border-l-2 border-dashed border-blue-400/30" />

                {/* Timeline items */}
                <div className="space-y-16">
                    {milestones.map((milestone, index) => (
                        <div key={index} className="relative">
                            {/* Dot */}
                            <div
                                className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full shadow-lg border-4 ${
                                    isCompleted ? "bg-green-500 border-green-300" : "bg-rose-500 border-rose-300"
                                }`}
                            />

                            {/* Content */}
                            <div
                                className={`flex items-center gap-8 ${
                                    index % 2 === 0 ? "flex-row-reverse" : ""
                                }`}
                            >
                                {/* Card */}
                                <div
                                    className={`flex-1 max-w-[50%] ${index % 2 === 0 ? "text-right" : "text-left"}`}
                                >
                                    <div className=" p-6 rounded-lg border border-blue-500/20 hover:shadow-lg transition-shadow">
                                        <h3
                                            className={`${
                                                isCompleted ? "text-green-400" : "text-rose-400"
                                            } font-semibold text-2xl mb-2`}
                                        >
                                            {milestone.title}
                                        </h3>
                                        <p className="text-gray-300 text-sm">{milestone.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
