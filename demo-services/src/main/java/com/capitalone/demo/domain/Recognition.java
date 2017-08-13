/**
 * 
 */
package com.capitalone.demo.domain;


public class Recognition {

    public String quote;

    public Recognition(String quote) {
        this.quote = quote;
    }

    @Override
    public String toString() {
        return "Recognition{" +
                "quote='" + quote + '\'' +
                '}';
    }
}
