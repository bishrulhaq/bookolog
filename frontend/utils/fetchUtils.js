import {NextResponse} from 'next/server'

const uri = process.env.APP_ENV === 'development' ? 'http://localhost:4000/api' : 'https://bookolog.com/api';

export async function fetchBooks(page, limit) {
    return fetch(`${uri}/book?page=${page || 1}&limit=${limit || 20}`).then((response) => {
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
    return fetch(`${uri}/book/featured-books`).then((response) => {
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
    return fetch(`${uri}/book/trending-books`).then((response) => {
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
    return fetch('http://backend:4000/api/book/increment-view', {
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
    return fetch(`${uri}/book/search-title?title=${searchByTitle}`).then((response) => {
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
    return fetch(`${uri}/author/${getById}`).then((response) => {
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

    return fetch(`${uri}/book/isbn?isbn=${searchByISBN}`).then((response) => {
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
    return fetch(`${uri}/book/search-authors?author=${searchByAuthor}`).then((response) => {
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
    return fetch(`${uri}/book/search-category?category=${searchByGenre}`).then((response) => {
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

    return fetch(`${uri}/category`).then((response) => {
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

    return fetch(`${uri}/category/all`).then((response) => {
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
        const response = await fetch(`http://backend:4000/auth/register`, {
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
        const response = await fetch(`${uri}/comment/add`, {
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

export async function fetchReply(bookId, userId, replyText, parentCommentId) {
    try {
        const response = await fetch(`${uri}/comment/add-reply`, {
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

export async function fetchGetComment(bookId) {
    try {
        const response = await fetch(`${uri}/comment/get?book_id=${bookId}`, {
            method: 'GET', headers: {'Content-Type': 'application/json'},
        });

        return response.json();

    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

export async function fetchAuthorize(credentials) {
    return fetch(`http://backend:4000/auth/authorize`, {
        method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(credentials)
    }).then((response) => {

        return response.json();
    }).catch((error) => {
        console.error('Error:', error);
        throw error;
    });
}

export async function fetchAuthorizedUser(credentials) {
    return fetch(`http://backend:4000/auth/user`, {
        method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(credentials)
    }).then((response) => {
        return response.json();
    }).catch((error) => {
        console.error('Error:', error);
        throw error;
    });
}


export async function fetchProviderAuthorize(credentials) {
    return fetch(`http://backend:4000/auth/provider-authorize`, {
        method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(credentials)
    }).then((response) => {
        return response.json();
    }).catch((error) => {
        console.error('Error:', error);
        throw error;
    });
}

export async function fetchBookById(getByd) {

    return fetch(`http:/backend:4000/api/book/${getByd}`).then((response) => {
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


export async function fetchUser(id) {

    return fetch(`${uri}/user/${id}`).then((response) => {
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


export async function updateUser(user) {

    return fetch(`${uri}/user/update`, {
        method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(user)
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


export async function fetchInteraction(userId, bookId, interactionType, value) {
    return fetch(`${uri}/user-book/interaction-status`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId, bookId, interactionType, value}),
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



