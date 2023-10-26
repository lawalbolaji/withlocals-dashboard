import { ReactNode } from "react";
import { useLocalGuideInformation } from "../hooks/useLocalGuideInformation";
import { LanguagesFilter } from "./languages-filter/LanguagesFilter";
import { LocaleGuidesGallery } from "./gallery/LocalGuidesGallery";
import { EmptyResultSet } from "./shared/EmptyResultSet";
import { ErrorPage } from "./shared/ErrorPage";

export function LocaleGuideDashboard() {
    const { error, status, localGuides, languages, addToFilter, removeFromFilter } = useLocalGuideInformation();
    const pageMap: Record<typeof status, ReactNode> = {
        error: <ErrorPage message={error} />,
        success: (
            <div className="h-screen w-screen">
                <LanguagesFilter languages={languages} addToFilter={addToFilter} removeFromFilter={removeFromFilter} />
                {localGuides.length > 0 ? (
                    <div className="container mx-auto lg:px-[96px] xl:px-[0] px-[2%]">
                        <div className="h-[10%] mt-[36px] mb-[33px]">
                            <p className="font-bold text-3xl text-[#4A4A4A]">{localGuides.length} locals found</p>
                        </div>
                        <LocaleGuidesGallery localGuides={localGuides} />
                    </div>
                ) : (
                    <EmptyResultSet />
                )}
            </div>
        ),
        loading: (
            <div
                className="h-screen w-screen text-center text-xl flex flex-col justify-center"
                data-testid="loading-screen"
            >
                <p>loading</p>
            </div>
        ),
        idle: null,
    };

    return pageMap[status];
}
