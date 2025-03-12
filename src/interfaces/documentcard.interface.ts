
export interface IRandomImage {
    src: string;
    alt: string;
}

export interface IDocumentCardProps {
    data: {
        attributes: {
            wordCount: number;
            isDigest: boolean;
            isTechNews: boolean;
            isAnnouncement: boolean;
        };
        date: string;
        source: string;
        text: string;
        title: string;
        url: string;
    };
}