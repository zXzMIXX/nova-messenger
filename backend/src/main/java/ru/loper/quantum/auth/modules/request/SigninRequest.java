package ru.loper.quantum.auth.modules.request;

import lombok.Data;

@Data
public class SigninRequest {
    private String username;
    private String password;
}
