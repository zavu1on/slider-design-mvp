'use client';

import { type FC, useEffect } from 'react';
import { Grid2X2Plus, Image, Settings, Sparkles, Type } from 'lucide-react';
import Link from 'next/link';
import { useUserMaterialsStore } from '@/entities/slides';
import type { Material } from '@/generated/prisma';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/generated/shadcn/accordion';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/generated/shadcn/sidebar';
import { Button } from '@/shared/ui';
import { ImageLoader, ProjectNameInput, ProjectSettings } from './lib';

const SIDEBAR_ITEMS = [
  {
    title: 'Настройки',
    icon: Settings,
    body: <ProjectSettings />,
  },
  {
    title: 'Элементы',
    icon: Grid2X2Plus,
    body: <p>Заглушка</p>,
  },
  {
    title: 'Изображения',
    icon: Image,
    body: <ImageLoader />,
  },
  {
    title: 'Текст',
    icon: Type,
    body: <p>Заглушка</p>,
  },
  {
    title: 'AI',
    icon: Sparkles,
    body: <p>Заглушка</p>,
  },
];

type EditorSidebarProps = {
  id: string;
  name: string;
  materials: Material[];
};

export const EditorSidebar: FC<EditorSidebarProps> = ({
  id,
  name,
  materials,
}) => {
  const setMaterials = useUserMaterialsStore((store) => store.setMaterials);

  useEffect(() => {
    setMaterials(materials);
  }, []);

  return (
    <div className="flex flex-row bg-slate-200">
      <Sidebar className="editor-sidebar">
        <SidebarContent className="bg-gray-800 text-slate-300">
          <SidebarGroup>
            <SidebarGroupLabel className="text-white font-bold w-full">
              <ProjectNameInput id={id} initialName={name} />
            </SidebarGroupLabel>
            <SidebarGroupContent className="mt-2">
              <SidebarMenu>
                <Accordion type="single" collapsible>
                  {SIDEBAR_ITEMS.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <AccordionItem value={item.title}>
                        <AccordionTrigger>
                          <SidebarMenuButton
                            asChild
                            className="hover:bg-slate-300 active:bg-slate-300"
                          >
                            <div className="cursor-pointer">
                              <item.icon />
                              <span>{item.title}</span>
                            </div>
                          </SidebarMenuButton>
                        </AccordionTrigger>
                        <AccordionContent className="mt-4">
                          {item.body}
                        </AccordionContent>
                      </AccordionItem>
                    </SidebarMenuItem>
                  ))}
                </Accordion>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="bg-gray-800">
          <Link href="/slides">
            <Button className="w-full hover:underline">
              К списку проектов
            </Button>
          </Link>
        </SidebarFooter>
      </Sidebar>
      <SidebarTrigger className="hover:bg-gray-800 hover:text-slate-300 rounded-l-none transition-all" />
    </div>
  );
};
