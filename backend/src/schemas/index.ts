export const listListsSchema = {
    tags: ['lists'],
    summary: 'List all the lists',
    response: {
        200: {
            description: 'Successful response',
            type: 'array',
            items: {
              $ref: 'ITodoList#'
            }
        }
    }
}

export const addListSchema = {
    tags: ['lists'],
    summary: 'Add a new list',
    body: {
        $ref: 'ITodoList#'
    }
}

export const changeListSchema = {
    tags: ['lists'],
    summary: 'Update an existing list',
    params: {
        type: 'object',
        properties: {
            id: { type: 'string', description: 'List ID' }
        },
        required: ['id']
    },
    body: {
        type: 'object',
        properties: {
            name: { type: 'string', description: 'Name of the list' },
            description: { type: 'string', description: 'Description of the list' }
        }
    },
    response: {
        200: {
            description: 'List updated successfully',
            $ref: 'ITodoList#'
        },
        404: {
            description: 'List not found',
            type: 'object',
            properties: {
                error: { type: 'string' }
            }
        }
    }
};

export const addListItemSchema = {
    tags: ['lists', 'items'],
    summary: 'Add an item to a specific list',
    params: {
        type: 'object',
        properties: {
            id: { type: 'string', description: 'List ID' }
        },
        required: ['id']
    },
    body: {
        type: 'object',
        properties: {
            idItem: { type: 'string', description: 'Item ID' },
            name: { type: 'string', description: 'Name of the item' }
        },
        required: ['idItem', 'name']
    },
    response: {
        200: {
            description: 'Item added successfully',
            type: 'object',
            properties: {
                id: { type: 'string' },
                idItem: { type: 'string' },
                name: { type: 'string' },
                status: { type: 'string', enum: ['PENDING'], description: 'Initial status' }
            }
        },
        404: {
            description: 'List not found',
            type: 'object',
            properties: {
                error: { type: 'string' }
            }
        }
    }
};

export const putListItemSchema = {
    tags: ['lists', 'items'],
    summary: 'Update an item in a specific list',
    params: {
        type: 'object',
        properties: {
            id: { type: 'string', description: 'List ID' },
            idItem: { type: 'string', description: 'Item ID' }
        },
        required: ['id', 'idItem']
    },
    body: {
        type: 'object',
        properties: {
            name: { type: 'string', description: 'New name for the item' },
            status: { type: 'string', enum: ['PENDING', 'COMPLETED'], description: 'Status of the item' }
        }
    },
    response: {
        200: {
            description: 'Item updated successfully',
            type: 'object',
            properties: {
                id: { type: 'string' },
                idItem: { type: 'string' },
                name: { type: 'string' },
                status: { type: 'string', enum: ['PENDING', 'COMPLETED'] }
            }
        },
        404: {
            description: 'List or item not found',
            type: 'object',
            properties: {
                error: { type: 'string' }
            }
        }
    }
};

export const delListItemSchema = {
    tags: ['lists', 'items'],
    summary: 'Delete an item from a specific list',
    params: {
        type: 'object',
        properties: {
            id: { type: 'string', description: 'List ID' },
            idItem: { type: 'string', description: 'Item ID' }
        },
        required: ['id', 'idItem']
    },
    response: {
        200: {
            description: 'Item deleted successfully',
            type: 'object',
            properties: {
                id: { type: 'string' },
                idItem: { type: 'string' }
            }
        },
        404: {
            description: 'List or item not found',
            type: 'object',
            properties: {
                error: { type: 'string' }
            }
        }
    }
};

