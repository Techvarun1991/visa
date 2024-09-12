package com.onehealth.lifestyleandhistory.config;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import io.netty.handler.ssl.SslContext;
import io.netty.handler.ssl.SslContextBuilder;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import reactor.netty.http.client.HttpClient;
import io.netty.handler.ssl.util.InsecureTrustManagerFactory;
 
 
 
@Configuration
public class WebClientConfig{
 
    @Bean
    @LoadBalanced
    public WebClient.Builder webClientBuilder() throws Exception {
        // Load the SSL certificate from the classpath
        //InputStream inputStream = new ClassPathResource("certificate.crt").getInputStream();
        //CertificateFactory certificateFactory = CertificateFactory.getInstance("X.509");
        //X509Certificate certificate = (X509Certificate) certificateFactory.generateCertificate(inputStream);
        //inputStream.close();
 
        // Disable hostname verification and create a custom SSL context
        SslContext sslContext = SslContextBuilder.forClient()
                .trustManager(InsecureTrustManagerFactory.INSTANCE)
                .build();
 
        // Create a Reactor Netty HttpClient with the custom SSL context
        HttpClient httpClient = HttpClient.create().secure(spec -> spec.sslContext(sslContext));
 
        // Create a WebClient.Builder with the HttpClient
        return WebClient.builder().clientConnector(new ReactorClientHttpConnector(httpClient));
    }
 
    @Bean
    @LoadBalanced
    public WebClient webClient(WebClient.Builder webClientBuilder) {
        // Build the WebClient using the configured WebClient.Builder
        return webClientBuilder.build();
    }
}
