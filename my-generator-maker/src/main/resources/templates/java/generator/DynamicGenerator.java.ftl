package ${basePackage}.generator;

import cn.hutool.core.io.FileUtil;
import ${basePackage}.model.DataModel;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;

/**
 * 动态代码生成器
 */
public class DynamicGenerator {

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

        if(!FileUtil.exist(outputPath)) {
            FileUtil.touch(outputPath);
        }

        Writer out = new FileWriter(outputPath);

        template.process(model, out);

        out.close();
    }
}
