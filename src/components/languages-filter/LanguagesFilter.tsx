type LanguageFilterProps = {
    languages: Array<string>;
    addToFilter: (language: string) => void;
    removeFromFilter: (language: string) => void;
};

export function LanguagesFilter(props: LanguageFilterProps) {
    return (
        <div className="w-full h-[100px] flex flex-col box-border shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]">
            <div className="h-full pt-4 pb-[24px] lg:px-[100px] px-[3%] flex flex-col">
                <div className="h-[24px]">
                    <p className="leading-6 font-bold text-xl text-[#4A4A4A]">Local guide language</p>
                </div>
                <div className="flex flex-row h-[24px] mt-auto gap-x-[3%] overflow-auto hide-scrollbar w-full">
                    {props.languages.map((language, idx) => (
                        <div key={idx} className="flex flex-row gap-x-2">
                            <input
                                type="checkbox"
                                className="inline-flex h-[24px] w-[24px] accent-[#E71575]"
                                id={language}
                                value={language}
                                data-testid={`language-filter-${language}`}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    if (e.currentTarget.checked) {
                                        props.addToFilter(language);
                                        return;
                                    }
                                    props.removeFromFilter(language);
                                }}
                            />
                            <label htmlFor={language} className="inline-flex font-medium text-base text-[#4A4A4A]">
                                {language}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
