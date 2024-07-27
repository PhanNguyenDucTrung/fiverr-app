export interface Review {
    _id: string;
    service: string;
    user: {
        _id: string;
        username: string;
        profilePicture: string;
    };
    rating: number;
    reviewText: string;
    createdAt: string;
}

export interface PricingPlan {
    title: string;
    price: number;
    benefits: string[];
}

export interface Service {
    id: string;
    title: string;
    description: string;
    price: number;
    aboutThisGig: string[];
    pricingPlans: PricingPlan[];
    userId: string;
    childCategoryId: string;
    likes: number;
    reviews: Review[];
    gallery: string[];
    faq: { question: string; answer: string }[];
    createdAt: string;
    username: string;
    profilePicture: string;
    averageRating: number;
    reviewsCount: number;
}
