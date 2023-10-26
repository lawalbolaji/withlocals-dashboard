import { LocalGuide } from "../../hooks/useLocalGuideInformation";
import { LocalGuideCard } from "./LocalGuideCard";

type LocaleGuidesProfileGalleryProps = {
    localGuides: Array<LocalGuide>;
};

export function LocaleGuidesGallery(props: LocaleGuidesProfileGalleryProps) {
    return (
        <div className="h-[70%] pb-[5%]">
            <div className="flex flex-row w-full gap-8 flex-wrap">
                {props.localGuides.map((localGuide) => (
                    <div key={localGuide._id} className="">
                        <LocalGuideCard localGuide={localGuide} />
                    </div>
                ))}
            </div>
        </div>
    );
}
