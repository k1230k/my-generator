package com.k123.maker;


//import com.k123.maker.cli.CommandExecutor;

import com.k123.maker.generator.main.GenerateTemplate;
import com.k123.maker.generator.main.MainGenerator;
import com.k123.maker.generator.main.ZipGenerator;
import freemarker.template.TemplateException;

import java.io.IOException;

public class Main {

    public static void main(String[] args) throws TemplateException, IOException, InterruptedException {
//        CommandExecutor commandExecutor = new CommandExecutor();
//        commandExecutor.doExecute(args);

//        GenerateTemplate mainGenerator = new MainGenerator();
        GenerateTemplate generateTemplate = new ZipGenerator();
        generateTemplate.doGenerate();
    }
}
