import React from 'react';
import NewPageheader from '@/components/reusable/NewPageheader';
import Expertise from "@/public/assets/Expertise.jpg";

type TechCategory = {
    title: string;
    tools: string[];
    highlight?: boolean;
};

const ServiceDetails = () => {
    return (
        <div className="overflow-x-hidden">
            {/* Header */}
            <NewPageheader
                description="HEXstream utilizes a wide collection of technologies to transform streams of operational data into actionable, real-time business intelligence to operate more efficiently, more safely, and more economically."
                img={Expertise}
                title="Expertise"
            />

            {/* Full-width Section */}
            <section className="bg-white py-20 px-6 text-black">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-3xl font-extrabold text-center mb-12 tracking-tight text-black">
                        Technologies & Expertise
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                        {techCategories.map((category) => (
                            <div
                                key={category.title}
                                className="border-b border-gray-300 pb-4  hover:translate-x-2 hover:bg-gray-100 rounded-lg transition-all duration-300 p-3"
                            >
                                <h3
                                    className={`text-xl font-semibold mb-2 ${
                                        category.highlight ? "text-red-600" : "text-red-600"
                                    }`}
                                >
                                    {category.title}
                                </h3>
                                <p className="text-base leading-relaxed text-gray-700 opacity-90 text-xl hover:opacity-100 transition-opacity">
                                    {category.tools.length > 0
                                        ? category.tools.join(", ") + ", etc."
                                        : "No tools listed"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

// Data remains same
const techCategories = [
    {
        title: 'Data Engineering',
        tools: ['Spark', 'Databricks', 'AWS Glue', 'Azure Data Factory', 'DBT', 'Matillion', 'OIC', 'GoldenGate', 'SOA', 'LEC', 'Informatica', 'Biztalk', 'Dell Boomi', 'Attunity'],
        highlight: true,
    },
    {
        title: 'Business Analysis',
        tools: ['NMS', 'C2M', 'CCB', 'CCS', 'WAM', 'WAX', 'DERMS', 'DACS', 'ERP', 'CRM', 'SCM', 'EPM', 'PPM'],
    },
    {
        title: 'Analytics',
        tools: ['OAC', 'OAS', 'OUDI','FDI','Data Visualizer', 'OBIEE', 'BI Publisher', 'Power BI', 'Looker', 'Qlik', 'Tableau'],
    },
    {
        title: 'Data Sciences / AI / ML',
        tools: ['Python', 'Databricks', 'AWS', 'Azure', 'Oracle'],
    },
    {
        title: 'Data Management',
        tools: ['Informatica', 'MDM', 'Collibra', 'Talend'],
    },
    {
        title: 'Databases',
        tools: ['Oracle', 'Delta Lake', 'Snowflake', 'Synapse', 'Redshift', 'BigQuery'],
    },
    {
        title: 'Agentic AI / GPT',
        tools: ['Open AI', 'Gemini', 'Langchain', 'CrewAI', 'CoPilot'],
        highlight: true,
    },
    {
        title: 'App Development',
        tools: ['Python', '.NET', 'Java', 'Fullstack', 'Angular.js', 'Node.js', 'iOS', 'Android'],
    },
    {
        title: 'No Code Development',
        tools: ['Oracle APEX', 'Microsoft PowerApps', 'Zapier'],
    },
];

export default ServiceDetails;
