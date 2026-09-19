package com.k123.generator;

import com.k123.model.MainTemplateConfig;
import freemarker.template.TemplateException;

import java.io.File;
import java.io.IOException;

public class MainGenerator {

    public static void doGenerate(Object model) throws TemplateException, IOException {
        //传入由命令行输入的参数组成的model，进行动态代码生成
        //先进行静态文件的拷贝

        //构建源目录和目标目录
        String projectPath = System.getProperty("user.dir");
        System.out.println("当前项目路径: " + projectPath);
        File parentFile = new File(projectPath).getParentFile();
        System.out.println("父目录路径: " + parentFile.getAbsolutePath());

        String inputPath = new File(parentFile, "my-generator-demo-projects/acm").getAbsolutePath();
        System.out.println("inputPath: " + inputPath);

        String outputPath = projectPath;
        System.out.println("outputPath: " + outputPath);

        StaticGenerator.copyFilesByRecursive(inputPath, outputPath);

        //动态生成
        String dynamicInputPath = projectPath + File.separator + "src/main/resources/templates/MainTemplate.java.ftl";
        String dynamicOutputPath = outputPath + File.separator + "acm/MainTemplate.java";
        System.out.println("动态路径：" + dynamicInputPath + "/n" + dynamicOutputPath);

        DynamicGenerator.doGenerate(dynamicInputPath, dynamicOutputPath, model);
    }

    public static void main(String[] args) throws TemplateException, IOException {
        /**
         * 先静态文件把项目拷贝过来，然后动态生成需要被修改的文件。
         */
//        String projectPath = System.getProperty("user.dir");
//        String inputPath = projectPath + File.separator + "my-generator-demo-projects" + File.separator + "acm";
//        String outputPath = projectPath;
//        StaticGenerator.copyFilesByRecursive(inputPath, outputPath);
//
//        String dynamicInputPath = projectPath + File.separator + "my-generator-basic" + File.separator + "src/main/resources/templates/MainTemplate.java.ftl";
//        String dynamicOutputPath = projectPath + File.separator + "acm/MainTemplate.java";
//        MainTemplateConfig mainTemplateConfig = new MainTemplateConfig();
//        mainTemplateConfig.setAuthor("k123");
//        mainTemplateConfig.setLoop(true);
//        mainTemplateConfig.setOutputText("求和结果: ");
//        DynamicGenerator.doGenerate(dynamicInputPath, dynamicOutputPath, mainTemplateConfig);

//        doGenerate(new MainTemplateConfig());


    }
}
