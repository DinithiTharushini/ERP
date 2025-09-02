package com.example.erp.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/health", "/h2-console/**").permitAll()
                // public reads
                .requestMatchers(HttpMethod.GET, "/api/courses/**", "/api/offerings/**").permitAll()
                // student reads for instructors
                .requestMatchers(HttpMethod.GET, "/api/students/**").hasAnyRole("ADMIN", "INSTRUCTOR")
                // enrollment reads for instructors and students
                .requestMatchers(HttpMethod.GET, "/api/enrollments/**").hasAnyRole("ADMIN", "INSTRUCTOR", "STUDENT")
                // writes restricted to admin
                .requestMatchers(HttpMethod.POST, "/api/students/**", "/api/instructors/**", "/api/courses/**", "/api/offerings/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/students/**", "/api/instructors/**", "/api/courses/**", "/api/offerings/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/students/**", "/api/instructors/**", "/api/courses/**", "/api/offerings/**").hasRole("ADMIN")
                // enrollments writes: admin or student
                .requestMatchers(HttpMethod.POST, "/api/enrollments/**").hasAnyRole("ADMIN", "STUDENT")
                .requestMatchers(HttpMethod.DELETE, "/api/enrollments/**").hasAnyRole("ADMIN", "STUDENT")
                // grades: instructor or admin
                .requestMatchers("/api/grades/**").hasAnyRole("ADMIN", "INSTRUCTOR")
                .anyRequest().authenticated()
            )
            .httpBasic(Customizer.withDefaults())
            .headers(headers -> headers.frameOptions(frame -> frame.disable()));
        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder encoder) {
        UserDetails admin = User.withUsername("admin").password(encoder.encode("admin123")).roles("ADMIN").build();
        UserDetails instructor = User.withUsername("instructor").password(encoder.encode("instr123")).roles("INSTRUCTOR").build();
        UserDetails student = User.withUsername("student").password(encoder.encode("stud123")).roles("STUDENT").build();
        return new InMemoryUserDetailsManager(admin, instructor, student);
    }

    @Bean
    public PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }
}


