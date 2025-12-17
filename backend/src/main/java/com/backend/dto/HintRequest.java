package com.backend.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HintRequest {

    private int[][] board;
    private int row;
    private int col;

}
