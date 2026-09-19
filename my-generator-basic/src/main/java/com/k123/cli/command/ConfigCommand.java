package com.k123.cli.command;

import cn.hutool.core.util.ReflectUtil;
import com.k123.model.MainTemplateConfig;
import picocli.CommandLine;

import java.lang.reflect.Field;

@CommandLine.Command(name = "config", description = "查看参数信息", mixinStandardHelpOptions = true)
public class ConfigCommand implements Runnable {

    public void run() {
        //读取配置类内容，可以使用hutool工具
        System.out.println("查看参数信息");
        Field[] fields = ReflectUtil.getFields(MainTemplateConfig.class);
        for (Field field : fields) {
            System.out.println("字段名：" + field.getName());
            System.out.println("字段类型：" + field.getType());
            System.out.println("---");
        }

    }
}
