package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class HintResponse {
    private int row;
    private int col;
    private int value;

}
