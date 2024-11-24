export interface Post {
    _id: string,
    place: Place,
    owner: string,
    description: string,
    comments: [],
    likes: [],
    dislikes: [],
    createdAt: string,
    updatedAt: string
}

export interface Place {
    imageUrl: string,
    location: string,
    address: string
}