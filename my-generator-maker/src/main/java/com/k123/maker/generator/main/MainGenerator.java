package com.k123.maker.generator.main;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.resource.ClassPathResource;
import cn.hutool.core.util.StrUtil;
import com.k123.maker.generator.JarGenerator;
import com.k123.maker.generator.ScriptGenerator;
import com.k123.maker.generator.file.DynamicFileGenerator;
import com.k123.maker.meta.Meta;
import com.k123.maker.meta.MetaManager;
import freemarker.template.TemplateException;

import java.io.File;
import java.io.IOException;

public class MainGenerator extends GenerateTemplate {


    public static void main(String[] args) throws TemplateException, IOException, InterruptedException {
        MainGenerator mainGenerator = new MainGenerator();
        mainGenerator.doGenerate();
    }
}
