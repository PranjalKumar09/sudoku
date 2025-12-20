package com.backend.entitiy;

import lombok.Getter;

@Getter
public class SudokuBoard {

    private final int[][] board;

    public SudokuBoard() {
        this.board = new int[9][9];
    }

    public SudokuBoard(int[][] board) {
        this.board = board;
    }


}
