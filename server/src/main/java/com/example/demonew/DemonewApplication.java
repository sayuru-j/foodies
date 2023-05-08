package com.example.demonew;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemonewApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemonewApplication.class, args);

	}
    @Bean
	public ModelMapper modelMapper(){       //inject model mapper dependency as class
		return new ModelMapper();         //    return that

	}
}
