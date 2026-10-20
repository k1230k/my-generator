package com.k123.maker.meta;

import cn.hutool.core.io.resource.ResourceUtil;
import cn.hutool.json.JSONUtil;

public class MetaManager {


    private static volatile Meta meta;

    private MetaManager() {

    }

    public static Meta getMetaObject() {

        if(meta == null) {
            synchronized (MetaManager.class) {
                if (meta == null) {
                    meta = initMeta();
                }
            }
        }
        return meta;
    }

    public static Meta initMeta() {
        String metaJson = ResourceUtil.readUtf8Str("springboot-init-meta.json");
        Meta newMeta = JSONUtil.toBean(metaJson, Meta.class);
        Meta.FileConfig fileConfig = newMeta.getFileConfig();
        // 校验配置文件，处理默认值
        MetaValidator.doValidAndFill(newMeta);

        return newMeta;
    }

}
