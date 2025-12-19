package com.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ValidateRequest {
    private int[][] board;
    private int row;
    private int col;
    private int value;
}
