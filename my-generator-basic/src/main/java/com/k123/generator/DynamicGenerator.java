package com.k123.generator;

import com.k123.model.MainTemplateConfig;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 动态代码生成器
 */
public class DynamicGenerator {
    public static void main(String[] args) throws Exception {
       String projectPath = System.getProperty("user.dir");
         String inputPath = projectPath + File.separator + "src/main/resources/templates/MainTemplate.java.ftl";
         String outputPath = projectPath + File.separator + "MainTemplate.java";
         MainTemplateConfig mainTemplateConfig = new MainTemplateConfig();
         mainTemplateConfig.setAuthor("k123");
            mainTemplateConfig.setOutputText("求和结果: ");
            mainTemplateConfig.setLoop(false);
            doGenerate(inputPath, outputPath, mainTemplateConfig);

    }

    /**
     *
     * @param inputPath
     * @param outputPath
     * @param model
     * @throws IOException
     * @throws TemplateException
     */
    public static void doGenerate(String inputPath, String outputPath, Object model) throws IOException, TemplateException {
        // new 出 Configuration 对象，参数为 FreeMarker 版本号
        Configuration configuration = new Configuration(Configuration.VERSION_2_3_32);

        File templateDir = new File(inputPath).getParentFile();
        // 指定模板文件所在的路径
        configuration.setDirectoryForTemplateLoading(templateDir);
        // 设置模板文件使用的字符集
        configuration.setDefaultEncoding("utf-8");
        // 设置数字格式，避免科学计数法
        configuration.setNumberFormat("0.######");
        //创建模板对象，加载指定模板文件
        String templateName = new File(inputPath).getName();
        Template template = configuration.getTemplate(templateName);

        Writer out = new FileWriter(outputPath);

        template.process(model, out);

        out.close();
    }
}
