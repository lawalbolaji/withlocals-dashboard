import { useEffect, useMemo, useState } from "react";
import { _client } from "../lib/api-client";

export type LocalGuide = {
    _index: string;
    _type: string;
    _id: string;
    _score: number;
    _source: {
        id: string;
        name: string;
        locations: Array<{
            country: string;
            area: string;
        }>;
        personal_title: string;
        photo: string;
        pretty_url: string;
        spoken_languages: Array<string>;
        passions: Array<string>;
        categories: Array<string>;
        detailedPassions: Array<unknown>;
        is_family_friendly: boolean;
        average_rating: number;
        reviews_count: number;
        available_dates: Array<string>;
        availability_score: number;
    };
};

type HostsData = {
    results: {
        hits: {
            hits: Array<LocalGuide>;
        };
    };
};

export function useLocalGuideInformation() {
    const [hostsData, setHostsData] = useState<HostsData | null>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [error, setError] = useState<string | null>(null);
    const [filteredLanguages, setFilteredLanguages] = useState<Array<string>>([]);

    useEffect(() => {
        async function getHosts() {
            try {
                setStatus("loading");
                setError(null);

                const apiResponse = await _client(
                    "https://www.withlocals.com/api/v1/hosts/search?location.country=italy&location.city=rome&lang=en&page=1"
                );

                setStatus("success");
                setHostsData(apiResponse);
            } catch (error) {
                setStatus("error");
                setError((error as { message: string; stack: string })?.message);
            }
        }

        getHosts();
        return () => {
            setHostsData(null);
            setStatus("idle");
            setError(null);
        };
    }, []);

    const localGuides = useMemo(() => {
        return hostsData
            ? (hostsData.results.hits.hits as Array<LocalGuide>).filter((localInfo) => {
                  return filteredLanguages.every((language) => localInfo._source.spoken_languages.includes(language));
              })
            : [];
    }, [hostsData, filteredLanguages]);

    const languages = useMemo(() => {
        const result = new Set<string>();
        if (hostsData === null) return [];

        (hostsData.results.hits.hits as Array<LocalGuide>).forEach((locale) =>
            locale._source.spoken_languages.forEach((language) => {
                result.add(language);
            })
        );

        return Array.from(result);
    }, [hostsData]);

    function addToFilter(language: string) {
        setFilteredLanguages((fLanguages) => {
            const updatedFilterList = [...fLanguages, language];
            return updatedFilterList;
        });
    }

    function removeFromFilter(language: string) {
        setFilteredLanguages((fLanguages) => {
            const updatedFilterList = fLanguages.filter((fLanguage) => fLanguage !== language);
            return updatedFilterList;
        });
    }

    return { status, error, localGuides, languages, addToFilter, removeFromFilter };
}
