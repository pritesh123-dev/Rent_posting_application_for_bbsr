package com.rentapp.bbsr.dto;

public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;

    public ApiResponse(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public boolean isSuccess() { return success; }
    public String getMessage() { return message; }
    public T getData() { return data; }

    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<T>(true, "OK", data);
    }

    public static <T> ApiResponse<T> ok(String msg, T data) {
        return new ApiResponse<T>(true, msg, data);
    }

    public static <T> ApiResponse<T> fail(String msg) {
        return new ApiResponse<T>(false, msg, null);
    }
}
