package com.k123.maker.generator;

import java.io.*;

public class JarGenerator {

    public static void doGenerate(String projectDir) throws InterruptedException, IOException {
        //调用 Process 类执行 Maven 打包命令
        String winMavenCommand = "mvn.cmd clean package -DskipTests=true";
        String otherMavenCommand = "mvn.cmd clean package -DskipTests=true";
        String mavenCommand = winMavenCommand;

        ProcessBuilder processBuilder = new ProcessBuilder(mavenCommand.split(" "));
        processBuilder.directory(new File(projectDir));

        Process process = processBuilder.start();

        //对于input、output一般是站在Java父进程视角命名的
        //这些代码用于读取命令的输出
        InputStream inputStream = process.getInputStream();
        //InputStreamReader起转换器作用，把字节变字符
        //BufferedReader起缓冲+按行读取的功能
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
        String line;
        while ((line = bufferedReader.readLine()) != null) {
            System.out.println(line);
        }

        int exitCode = process.waitFor();
        System.out.println("退出码：" + exitCode);
    }

    public static void main (String[] args) throws IOException, InterruptedException {
        doGenerate("D:/code/my-generator/my-generator-basic");
    }

}
