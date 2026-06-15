import { ECOSYSTEM_FEATURES } from '@/lib/ecosystem-features';

type EcosystemTitle = (typeof ECOSYSTEM_FEATURES)[number]['title'];

interface EcosystemPageProps {
    title: EcosystemTitle;
}

export function EcosystemPage({ title }: EcosystemPageProps) {
    const feature = ECOSYSTEM_FEATURES.find((f) => f.title === title)!;

    return (
        <div className="flex flex-col items-center px-4 text-center">
            <img
                src={feature.icon}
                alt=""
                className="mb-4 h-16 w-16 rounded-xl"
                style={{
                    boxShadow: `0 0 30px ${feature.color}80`,
                    backgroundColor: `${feature.color}30`,
                }}
            />
            <h1 className="text-4xl font-bold">{feature.title}</h1>
            <p className="mt-3 max-w-md text-text-secondary">{feature.description}</p>
        </div>
    );
}
