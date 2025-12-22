package com.backend.service;


import org.springframework.stereotype.Service;

@Service
public class SudokuValidatorService {

    public boolean isMoveValid(int[][] board, int row, int col, int value) {

        if (value < 1 || value > 9) return false;
        if (board[row][col] != 0) return false;

        return isValid(board, row, col, value);
    }


    public boolean isValid(int[][] board, int row, int col, int num) {

        // Check row
        for (int j = 0; j < 9; j++) {
            if (board[row][j] == num) return false;
        }

        // Check column
        for (int i = 0; i < 9; i++) {
            if (board[i][col] == num) return false;
        }

        // Check 3x3 box
        int startRow = row - row % 3;
        int startCol = col - col % 3;

        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (board[startRow + i][startCol + j] == num) {
                    return false;
                }
            }
        }

        return true;
    }
    public boolean isBoardSolved(int[][] board) {

        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {

                int value = board[row][col];
                if (value == 0) return false;

                board[row][col] = 0;
                boolean valid = isValid(board, row, col, value);
                board[row][col] = value;

                if (!valid) return false;
            }
        }
        return true;
    }

}
