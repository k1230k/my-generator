package com.k123.maker.meta;

/**
 * 元信息异常
 */
public class MetaException extends RuntimeException {
    public MetaException(String message) {

        super(message);
    }

    public MetaException(String message, Throwable cause) {
        super(message, cause);
    }

}
