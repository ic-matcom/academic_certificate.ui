export type ErrorDictionary = Record<string, Array<string>>;

export type Problem = {
    /**
     * HTTP status error code
     */
    status: number;

    /**
     * Token that identify the error type
     */
    type: string;

    /**
     * Details of the error (only in debug mode)
     */
    title: string;

    /**
     * Struct with the info related with member errors. E.g validation errors.
     * The Key is the model / dto / object member. The List contains the member errors
     * Could be null or have 0 items in some cases in which the other Problem property
     * are more important.
     */
    errors: ErrorDictionary;
}
