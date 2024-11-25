export interface Post {
    _id: string,
    place: Place,
    owner: Owner,
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
    region: string
}

export interface Owner {
    _id: string,
    avatar: string,
    username: string
}