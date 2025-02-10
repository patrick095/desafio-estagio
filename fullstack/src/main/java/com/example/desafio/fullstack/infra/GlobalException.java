package com.example.desafio.fullstack.infra;


import com.example.desafio.fullstack.exception.MissingIdException;
import com.example.desafio.fullstack.exception.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class GlobalException  {

    @ExceptionHandler(MissingIdException.class)
    public ResponseEntity<ProblemDetail> idNotFound(MissingIdException e){
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getLocalizedMessage());
        problemDetail.setTitle("Id não informado");
        problemDetail.setDetail("É necessário informar o modelo e a marca do dispositivo");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(problemDetail);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ProblemDetail> handleJsonParseException(HttpMessageNotReadableException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Erro ao ler a requisição");
        problemDetail.setTitle("Requisição inválida");
        problemDetail.setDetail("Verifique os dados enviados, pode haver um erro na formatação JSON.");
        return ResponseEntity.badRequest().body(problemDetail);
    }

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<ProblemDetail> handleNullPointerException(NullPointerException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getLocalizedMessage());
        problemDetail.setTitle("Requisição inválida");
        problemDetail.setDetail("Verifique os dados enviados e tente novamente.");
        return ResponseEntity.badRequest().body(problemDetail);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ProblemDetail> handleIllegalArgumentException(IllegalArgumentException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getMessage());
        problemDetail.setTitle("Marca inválida");
        problemDetail.setDetail("Verifique os dados enviados e tente novamente.");
        return ResponseEntity.badRequest().body(problemDetail);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ProblemDetail> handleNotFoundException(NotFoundException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
        problemDetail.setTitle("Recurso não encontrado");
        problemDetail.setDetail("Requisição com algo dado faltando");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(problemDetail);
    }
}
