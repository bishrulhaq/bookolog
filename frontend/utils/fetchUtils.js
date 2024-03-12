import {NextResponse} from 'next/server'

const uri = process.env.BACKEND_URL;

export async function fetchBooks(page, limit) {
    return fetch(`${uri}/api/book?page=${page || 1}&limit=${limit || 20}`).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).catch((error) => {
        console.error('Error:', error);
        throw error;
    });
}

export async function fetchFeaturedBooks() {
    return fetch(`${uri}/api/book/featured-books`).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
            throw error;
        });
}

export async function fetchTrendingBooks() {
    return fetch(`${uri}/api/book/trending-books`).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
            throw error;
        });

}

export async function incrementView(id) {
    return fetch(`${uri}/api/book/increment-view`, {
        method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({id}),
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
            throw error;
        });
}

export async function fetchBooksByTitle(searchByTitle) {
    return fetch(`${uri}/api/book/search-title?title=${searchByTitle}`).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
            throw error;
        });
}

export async function fetchAuthorById(getById) {
    return fetch(`${uri}/api/author/${getById}`).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
            throw error;
        });
}

export async function fetchBooksByISBN(searchByISBN) {

    return fetch(`${uri}/api/book/isbn?isbn=${searchByISBN}`).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
            throw error;
        });
}

export async function fetchBooksByAuthor(searchByAuthor) {
    return fetch(`${uri}/api/book/search-authors?author=${searchByAuthor}`).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
            throw error;
        });
}

export async function fetchBooksByGenre(searchByGenre) {
    return fetch(`${uri}/api/book/search-category?category=${searchByGenre}`).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
            throw error;
        });
}

export async function fetchHomeScreenGenres() {

    return fetch(`${uri}/api/category`).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
            throw error;
        });
}

export async function fetchAllGenres() {

    return fetch(`${uri}/api/category/all`).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
            throw error;
        });
}

export async function fetchRegister(credentials) {
    try {
        const response = await fetch(`${uri}/auth/register`, {
            method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(credentials),
        });

        return response.json();

    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}


export async function fetchComment(bookId, userId, commentText) {
    try {
        const response = await fetch(`${uri}/api/comment/add`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({bookId, userId, commentText}),
        });

        return response.json();

    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}


export async function fetchGetComment(bookId, limit, offset) {
    try {
        const response = await fetch(`${uri}/api/comment/get?book_id=${bookId}&offset=${offset}&limit=${limit}`, {
            method: 'GET', headers: {'Content-Type': 'application/json'},
        });

        return response.json();

    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

export async function fetchAddNudge(interactionId, userId, commentText, token) {
    try {
        const response = await fetch(`${uri}/api/nudge/add`, {
            method: 'POST',
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
            body: JSON.stringify({interactionId, userId, commentText}),
        });

        return response.json();

    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

export async function fetchGetNudge(interactionId, limit, offset, token) {
    try {

        const response = await fetch(`${uri}/api/nudge/get?interactionId=${interactionId}&offset=${offset}&limit=${limit}`, {
            method: 'GET',
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
        });

        return response.json();

    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}





export async function fetchReplyById(id) {
    try {
        const response = await fetch(`${uri}/api/comment/get-reply/${id}`, {
            method: 'GET', headers: {'Content-Type': 'application/json'},
        });

        return response.json();

    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

export async function fetchReply(bookId, userId, replyText, parentCommentId) {
    try {
        const response = await fetch(`${uri}/api/comment/add-reply`, {
            method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
                bookId, userId, commentText: replyText, parentCommentId,
            }),
        });

        return response.json();

    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}



export async function fetchAuthorize(credentials) {
    return fetch(`${uri}/auth/authorize`, {
        method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(credentials)
    }).then((response) => {

        return response.json();
    }).catch((error) => {
        console.error('Error:', error);
        throw error;
    });
}

export async function fetchAuthorizedUser(credentials) {
    return fetch(`${uri}/auth/user`, {
        method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(credentials)
    }).then((response) => {
        return response.json();
    }).catch((error) => {
        console.error('Error:', error);
        throw error;
    });
}

export async function fetchProviderUser(credentials) {
    return fetch(`${uri}/auth/provider-user`, {
        method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(credentials)
    }).then((response) => {
        return response.json();
    }).catch((error) => {
        console.error('Error:', error);
        throw error;
    });
}

export async function fetchProviderAuthorize(credentials) {
    return fetch(`${uri}/auth/provider-authorize`, {
        method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(credentials)
    }).then((response) => {

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then((data) => {
            return data;
        }).catch((error) => {
            console.error('Error:', error);
            throw error;
        });
}

export async function fetchBookById(id) {

    return fetch(`${uri}/api/book/${id}`, {
        method: "GET", headers: {"Content-Type": "application/json"}
    }).then((response) => {

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
            throw error;
        });
}


export async function fetchBookByIdForListing(id) {

    return fetch(`${uri}/api/book/listing/${id}`, {
        method: "GET", headers: {"Content-Type": "application/json"}
    }).then((response) => {

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
            throw error;
        });
}

export async function fetchUser(id, token) {
    return fetch(`${uri}/api/user/${id}`, {
        method: "GET", headers: {"Authorization": `Bearer ${token}`}
    }).then((response) => {

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then((data) => {
        return data;
    }).catch((error) => {
        console.error('Error:', error);
        throw error;
    });

}


export async function updateUser(user, token) {

    return fetch(`${uri}/api/user/update`, {
        method: "POST",
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
        body: JSON.stringify(user)
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).catch((error) => {
        console.error('Error:', error);
        throw error;
    });
}

export async function fetchQuote() {
    return fetch(`${uri}/api/com/quote`, {
        method: 'GET', headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).catch((error) => {
        console.error('Error:', error);
        throw error;
    });
}

export async function fetchUserInteraction(book_id, user_id, token) {

    return fetch(`${uri}/api/user-book/get-interaction`, {
        method: "POST", headers: {
            "Content-Type": "application/json", "Authorization": `Bearer ${token}`,
        }, body: JSON.stringify({book_id: book_id, user_id: user_id})
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then((data) => {
        return data;
    }).catch((error) => {
        console.error('Error:', error);
        throw error;
    });
}

export async function fetchInteractionCount(book_id) {

    return fetch(`${uri}/api/user-book/get-int-count/${book_id}`, {
        method: "GET", headers: {
            "Content-Type": "application/json"
        }, cache: 'no-store',
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then((data) => {
        return data;
    }).catch((error) => {
        console.error('Error:', error);
        throw error;
    });
}


export async function fetchSetInteraction(userId, bookId, interactionType, value, token) {
    return fetch(`${uri}/api/user-book/update-interaction`, {
        method: 'POST', headers: {
            'Content-Type': 'application/json', "Authorization": `Bearer ${token}`
        }, body: JSON.stringify({userId, bookId, interactionType, value}),
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).catch((error) => {
        console.error('Error:', error);
        throw error;
    });
}


export async function fetchCountries(token) {
    return fetch(`${uri}/api/com/countries`, {
        method: 'GET', headers: {
            'Content-Type': 'application/json', "Authorization": `Bearer ${token}`
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).catch((error) => {
        console.error('Error:', error);
        throw error;
    });
}

export async function insertBookInteraction(formData, token) {

    return fetch(`${uri}/api/user-book/insert-book-interaction`, {
        method: "POST",
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
        body: JSON.stringify({formData})
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).catch((error) => {
        console.error('Error:', error);
        throw error;
    });
}


export async function fetchTimeline(code, token) {

    return fetch(`${uri}/api/user-book/timeline/${code}`, {
        cache: 'no-cache',
        method: "GET", headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).catch((error) => {
        console.error('Error:', error);
        throw error;
    });
}

export async function fetchUserByUUID(uuid) {
    return fetch(`${uri}/api/user/uuid`, {
        method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({uuid: uuid})
    }).then((response) => {

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then((data) => {
        return data;
    }).catch((error) => {
        console.error('Error:', error);
        throw error;
    });

}

export async function fetchProfilePicture(formData) {
    return fetch(`${uri}/api/user/profile-picture`, {
        cache: 'no-cache',
        method: "POST",
        body: formData
    }).then((response) => {

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then((data) => {
        return data;
    }).catch((error) => {
        console.error('Error:', error);
        throw error;
    });

}